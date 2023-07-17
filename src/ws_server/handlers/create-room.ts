import { ROOMS } from "../data/rooms.js";
import { regRData } from "../types.js";

export function createRoom(user: regRData) {
    const newRoom = {
        roomId: ROOMS.length + 1,
        roomUsers: [
            {
                name: user.name,
                index: user.index,
            },
        ],
    };
    const isCreated = ROOMS
        .every((room) => room.roomUsers
            .every((use) => use.index !== user.index));
    if (isCreated) ROOMS.push(newRoom);
}