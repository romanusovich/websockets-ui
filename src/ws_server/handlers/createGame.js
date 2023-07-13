import { GAMES } from "../data/games.js";

export function createGame(firstPlayerID, secondPlayerID) {
    const newGame = {
        idGame: GAMES.length + 1,
        firstPlayer: {
            id: firstPlayerID,
            ships: []
        },
        secondPlayer: {
            id: secondPlayerID,
            ships: []
        },
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