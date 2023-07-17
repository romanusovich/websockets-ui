import { GAMES } from "../data/games.js";

export function createGame(firstPlayerID: number, secondPlayerID: number) {
    const newGame = {
        idGame: GAMES.length + 1,
        firstPlayer: {
            id: firstPlayerID,
            ships: [],
            shots: new Set<string>(),
        },
        secondPlayer: {
            id: secondPlayerID,
            ships: [],
            shots: new Set<string>(),
        },
        turn: 0,
        lastStatus: '',
    };
    GAMES.push(newGame);
    return [
        {
            type: 'create_game',
            data: JSON.stringify({
                idGame: newGame.idGame,
                idPlayer: firstPlayerID,
            }),
            id: 0,
        }, 
        {
            type: 'create_game',
            data: JSON.stringify({
                idGame: newGame.idGame,
                idPlayer: secondPlayerID,
            }),
            id: 0,
        },
    ];
}