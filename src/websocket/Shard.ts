import WebSocket from 'ws';
import { Client } from '../Client';

export class Shard {
  /** The shard id */
  id: string;
  /** The client itself */
  client: Client;
  /** The base websocket url */
  url = `wss://api.guilded.gg/socket.io/?jwt=undefined&EIO=3&transport=websocket`;
  /** The amount of attempts to connect */
  connectAttempts = 0;
  /** Whether or not this shard is currently connecting */
  isConnecting = false;
  /** The current status of this shard */
  status: 'connecting' | 'handshaking' | 'resuming' | 'disconnected' = 'disconnected';
  /** Whether or not the heartbeat received was acknowledged */
  lastHeartbeatAck = false;
  /** The connection timeout */
  connectTimeout?: NodeJS.Timeout;
  /** The heartbeat interval. Important to keep track for stopping heartbeats when necessary. */
  heartbeatInterval?: NodeJS.Timeout;
  /** The timestamp when the last heartbeat was acknowledged */
  lastHeartbeatReceived = 0;
  /** The timestamp when we sent the last heartbeat */
  lastHeartbeatSent = 0;
  ws: WebSocket | undefined;
  sessionID = '';
  /** Reconnection attempts used up for this shard. */
  reconnectionAttempts = 0;
  /** The maximum allowed attempts to reconnect */
  maxReconnectionAttempts = Infinity;

  constructor(
    id: string,
    client: Client,
    options?: { reconnectionAttempt?: number; maxReconnectionAttempts?: number },
  ) {
    this.client = client;
    this.id = id;
    if (options?.reconnectionAttempt) this.reconnectionAttempts = options.reconnectionAttempt;
    this.maxReconnectionAttempts = options?.maxReconnectionAttempts || this.client.maxReconnectionAttempts;
    if (options?.maxReconnectionAttempts) this.maxReconnectionAttempts = options.maxReconnectionAttempts;

    // PREVENT DUMB CLASS/THIS BINDING ISSUE
    this.onShardOpen = this.onShardOpen.bind(this);
    this.onShardMessage = this.onShardMessage.bind(this);
    this.onShardError = this.onShardError.bind(this);
    this.onShardClose = this.onShardClose.bind(this);
  }

  /** The amount of milliseconds it took to complete the heartbeat logic in the last attempt. */
  get ping() {
    return this.lastHeartbeatReceived - this.lastHeartbeatSent;
  }

  /** Connects to the Guilded gateway websocket if possible. */
  connect() {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
      ++this.connectAttempts;
      this.isConnecting = true;
      return this.initialize();
    }

    this.client.emit('connectError', new Error('Existing connection detected'), this.id);
  }

  /** Initialize the websocket connection and setup handling */
  initialize() {
    this.status = 'connecting';

    this.ws = new WebSocket(this.url, {
      headers: {
        cookie: `hmac_signed_session=${this.client.requestManager.hmacSignedSession}`,
      },
    });
    this.ws.on('open', this.onShardOpen);
    this.ws.on('message', this.onShardMessage);
    this.ws.on('error', this.onShardError);
    this.ws.on('close', this.onShardClose);

    this.connectTimeout = setTimeout(() => {
      if (this.isConnecting) {
        this.client.emit('wsConnectionError', new Error('Connection timeout'), this.id);
        this.disconnect();
      }
    }, this.client.connectionTimeout);
  }

  /** Handler for whenever a shard emits open event */
  onShardOpen() {
    this.status = 'handshaking';
    this.client.emit('connect', this.id);
    this.lastHeartbeatAck = true;
  }

  /** Handler for whenever a shard emits message event */
  onShardMessage(data: WebSocket.Data) {
    try {
      const code = data.toString().match(/[0-9]+/)?.[0];
      if (!code) return;

      const message = data.toString().substring(code?.toString().length);
      const packet = JSON.parse(message || '{}');

      this.client.emit('raw', packet, this.id);
      switch (code) {
        case '0':
          // SAVE THE SESSION ID
          this.sessionID = packet.sid;
          // IF ALREADY HEARTBEATING ON THIS SHARD STOP THE OLD ONE
          if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
          }

          // BEGIN HEARTBEATING
          this.heartbeatInterval = setInterval(() => this.heartbeat(), packet.pingInterval);

          // IT IS NOW FULLY CONNECTED
          this.isConnecting = false;
          // STOP THE TIMEOUT ERROR SINCE WE ARE FULLY CONNECTED
          if (this.connectTimeout) {
            clearTimeout(this.connectTimeout);
          }
          this.connectTimeout = undefined;

          this.client.emit('hello', packet, this.id);
          break;
        case '3':
          this.lastHeartbeatAck = true;
          this.lastHeartbeatReceived = Date.now();
          break;
        case '40':
          // TODO: MAY NEED TO BE SHARDREADY
          this.client.emit('ready');
          break;
        case '42':
          this.client.eventsManager.process(this.id, packet);
          break;
        default:
          // UNKNOWN EVENT
          this.client.emit('unknown', code, packet, this.id);
      }
    } catch (err) {
      this.client.emit('shardMessageError', err, this.id);
    }
  }

  /** Handler for whenever a shard emits error event */
  onShardError(error: Error) {
    this.client.emit('shardError', error, this.id);
  }

  /** Handler for whenever a shard emits close event */
  onShardClose(code: number, reason: string) {
    this.client.emit(
      'debug',
      `[DEBUG] Shard disconnected`,
      this.id,
      `With code ${code} because of: ${reason || 'Unknown reason.'}`,
    );
    this.client.emit('shardClosed', this.id, code, reason);
    // TODO: Remove this extra log, for debugging only
    console.log('shard closed', code, reason);
    this.disconnect();
  }

  /** Handle disconnection of the shard when necessary */
  disconnect(reconnect = true) {
    // IMMEDIATELY STOP HEARTBEATING
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }

    // HANDLE IF IT HAS NOT BEEN CLOSED ALREADY
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      // REMOVE THE LISTENER TO PREVENT INFINITE LOOP
      this.ws?.removeListener('close', this.onShardClose);

      if (reconnect && this.sessionID) {
        if (this.ws.readyState === WebSocket.OPEN) this.ws.close(4901, 'Reconnect with session id please');
        else this.ws.terminate();
      } else this.ws.close(1000, 'Clean close with no reconnection.');
    }

    // PREVENT INFINITE REATTEMPTS
    if (this.reconnectionAttempts >= this.maxReconnectionAttempts) return;
    this.reconnectionAttempts++;

    // DELETE THE CURRENT EVENT EMITTER
    this.client.websocketManager.delete(this.id);
    // RECONNECT THE SHARD AGAIN
    this.client.websocketManager.connect(
      new Shard(this.id, this.client, {
        reconnectionAttempt: this.reconnectionAttempts,
        maxReconnectionAttempts: this.maxReconnectionAttempts,
      }),
    );
  }

  /** Sends a heartbeat to the websocket and rest to maintain the connection */
  heartbeat() {
    this.lastHeartbeatSent = new Date().getTime();
    // DON"T HEARTBEAT IF NOT OPEN
    if (this.ws?.readyState !== WebSocket.OPEN) return;

    this.ws?.send('2');
    this.client.requestManager.ping();
  }
}
