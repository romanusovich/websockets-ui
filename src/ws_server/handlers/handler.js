import { reg } from "./reg.js";
import { createRoom } from "./create-room.js";
import { updateRoom } from "./update-room.js";
import { addUserToRoom } from "./add-user-to-room.js";
import { updateWinners } from "./update-winners.js";
import { addShips } from "./add-ships.js";
import { turn } from "./turn.js";

export function WSHandler(data, user, ws) {
    const body = data.data ? JSON.parse(data.data) : '';
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
        default:
            return 'Bad req type';
    }
};