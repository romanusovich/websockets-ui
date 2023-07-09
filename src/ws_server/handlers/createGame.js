import { GAMES } from "../data/games.js";

export function createGame(user) {
    return {
        type: 'create_game',
        data: JSON.stringify({
            idGame: GAMES.length,
            idPlayer: user.index,
        }),
        id: 0,
    };
}