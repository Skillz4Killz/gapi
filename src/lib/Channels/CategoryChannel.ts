import { Client } from "../../Client";
import { GroupChannel } from "./GroupChannel";

export class CategoryChannel extends GroupChannel {
    constructor(client: Client, payload: any) {
        super(client, payload);


    }
}

// {
//     priority: 4,
//     roles: null,
//     rolesById: { '590401': [Object], '591232': [Object] },
//     userPermissions: null
//   },

