import { PLAYERS } from "../data/players.js";
import { ROOMS } from "../data/rooms.js";
import { createGame } from "./createGame.js";

export function addUserToRoom(data, secondUser) {
    const roomId = ROOMS.findIndex((roo) => roo.roomId === data.indexRoom);
    const room = ROOMS[roomId];
    const isSelfConnect = room.roomUsers
        .every((use) => secondUser.index === use.index);
    if (!isSelfConnect) {
        ROOMS[roomId]
            .roomUsers.push({
                name: secondUser.name,
                index: secondUser.index,
            });
        const firstUser = PLAYERS
            .find((player) => player.id === room.roomUsers[0].index);
        ROOMS.splice(roomId, 1);
        const result = createGame(secondUser.index, firstUser.id);
        firstUser.ws.send(JSON.stringify(result[0]));
        return result[1];
    }
    return {};
}