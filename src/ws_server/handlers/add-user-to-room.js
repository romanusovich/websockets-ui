import { PLAYERS } from "../data/players.js";
import { ROOMS } from "../data/rooms.js";
import { createGame } from "./createGame.js";

export function addUserToRoom(data, user) {
    const roomId = ROOMS.findIndex((roo) => roo.roomId === data.indexRoom);
    const room = ROOMS[roomId];
    const isSelfConnect = room.roomUsers
        .every((use) => user.index === use.index);
    if (!isSelfConnect) {
        ROOMS[roomId]
            .roomUsers.push({
                name: user.name,
                index: user.index,
            });
        const secondUser = PLAYERS
            .find((player) => player.id === room.roomUsers[0].index);
        ROOMS.splice(roomId, 1);
        secondUser.ws.send(JSON.stringify(createGame(secondUser)));
        return createGame(user);
    }
    return {};
}