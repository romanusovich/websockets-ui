import { GAMES } from "../data/games.js";
import { PLAYERS } from "../data/players.js";

export function turn(data) {
    const game = GAMES.find((gam) => gam.idGame === data.gameId);
    if (!game.turn) {
        const isZero = Math.round(Math.random());
        game.turn = isZero ? game.firstPlayer.id : game.secondPlayer.id;
    } else if (game.lastStatus === 'miss' || game.lastStatus === 'kill') {
        game.turn = game.turn === game.firstPlayer.id
            ? game.secondPlayer
            : game.firstPlayer;
    }
    const readyPlayer = game.firstPlayer.id !== data.indexPlayer
            ? game.firstPlayer
            : game.secondPlayer;
        const readyPlayerWS = PLAYERS
            .find((player) => player.id === readyPlayer.id).ws;
        readyPlayerWS.send(JSON.stringify({
            type: 'turn',
            data: JSON.stringify({
                currentPlayer: game.turn,
            }),
            id: 0,
        }));
    return {
        type: "turn",
        data: JSON.stringify({
            currentPlayer: game.turn,
        }),
        id: 0,
    };
}