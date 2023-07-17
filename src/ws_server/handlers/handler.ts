import { reg } from "./reg.js";
import { createRoom } from "./create-room.js";
import { updateRoom } from "./update-room.js";
import { addUserToRoom } from "./add-user-to-room.js";
import { updateWinners } from "./update-winners.js";
import { addShips } from "./add-ships.js";
import { turn } from "./turn.js";
import { attack } from "./attack.js";
import { User, WSRequest, regRData } from "../types.js";

export function WSHandler(data: WSRequest, user: regRData, ws: WebSocket | any) {
    const body = data.data ? JSON.parse(data.data as string) : '';
    switch (data.type) {
        case 'reg':
            return [reg(body, ws), updateRoom(), updateWinners()];
        case 'create_room':
            createRoom(user);
            return [{ cast: 'broad', data: updateRoom() }];
        case 'add_user_to_room':
            return [addUserToRoom(body, user), { cast: 'broad', data: updateRoom() }];
        case 'add_ships':
            return [addShips(body), turn(body)];
        case 'attack':
            return [...attack(body), turn(body), { cast: 'broad', data: updateWinners() }];
        case 'randomAttack':
            return [...attack(body), turn(body), { cast: 'broad', data: updateWinners() }];
        default:
            return 'Bad req type';
    }
};