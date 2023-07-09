import { WINNERS } from "../data/winners.js";

export function updateWinners() {
    return {
        type: 'update_winners',
        data: JSON.stringify([
            ...WINNERS,
        ]),
        id: 0,
    };
}