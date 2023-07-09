import { ROOMS } from "../data/rooms.js";

export function createRoom(user) {
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