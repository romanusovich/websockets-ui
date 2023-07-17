import { GAMES } from "../data/games.js";
import { PLAYERS } from "../data/players.js";
import { Game, addShipsData, attackData } from "../types.js";

export function turn(data: addShipsData | attackData) {
    const game = GAMES.find((gam) => gam.idGame === data.gameId) as Game;
    if (!game.turn) {
        const isZero = Math.round(Math.random());
        game.turn = isZero
            ? game.firstPlayer.id
            : game.secondPlayer.id;
    } else if (game.lastStatus === 'miss' || game.lastStatus === 'killed') {
        game.turn = game.turn === game.firstPlayer.id
            ? game.secondPlayer.id
            : game.firstPlayer.id;
    }
    const readyPlayer = game.firstPlayer.id !== data.indexPlayer
        ? game.firstPlayer
        : game.secondPlayer;
    const readyPlayerWS = PLAYERS
        .find((player) => player.id === readyPlayer.id)?.ws as WebSocket;
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