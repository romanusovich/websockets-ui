import { GAMES } from "../data/games.js";
import { PLAYERS } from "../data/players.js";
import { Game, Ship, User, addShipsData } from "../types.js";

export function addShips(data: addShipsData) {
    const game = GAMES.find((gam) => gam.idGame === data.gameId) as Game;
    const currentPlayer = game.firstPlayer.id === data.indexPlayer
        ? game.firstPlayer
        : game.secondPlayer;
    currentPlayer.ships = data.ships;
    if (game.firstPlayer.ships.length && game.secondPlayer.ships.length) {
        const readyPlayer = game.firstPlayer.id !== data.indexPlayer
            ? game.firstPlayer
            : game.secondPlayer;
        const readyPlayerWS = PLAYERS
            .find((player) => player.id === readyPlayer.id)?.ws as WebSocket;
        readyPlayerWS.send(JSON.stringify({
            type: 'start_game',
            data: JSON.stringify({
                ships: readyPlayer.ships,
                currentPlayerIndex: readyPlayer.id,
            }),
            id: 0,
        }));
        return {
            type: 'start_game',
            data: JSON.stringify({
                ships: currentPlayer.ships,
                currentPlayerIndex: currentPlayer.id,
            }),
            id: 0,
        }
    }
    return {};
}