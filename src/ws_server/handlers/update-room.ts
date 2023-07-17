import { ROOMS } from "../data/rooms.js";

export function updateRoom() {
    return {
        type: 'update_room',
        data: JSON.stringify([
            ...ROOMS.filter((room) => room.roomUsers.length <= 1),
        ]),
        id: 0,
    };
}