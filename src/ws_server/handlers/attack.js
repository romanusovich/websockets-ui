import { GAMES } from "../data/games.js";
import { PLAYERS } from "../data/players.js";
import { WINNERS } from "../data/winners.js";

export function attack(data) {
    const game = GAMES.find((gam) => gam.idGame === data.gameId);
    const enemyPlayer = game.firstPlayer.id !== data.indexPlayer
        ? game.firstPlayer
        : game.secondPlayer;
    if (!data.hasOwnProperty('x') && !data.hasOwnProperty('y')) {
        data.x = getRandomInt(0, 9);
        data.y = getRandomInt(0, 9);
        while (enemyPlayer.shots.has(`${data.x}${data.y}`)) {
            data.x = getRandomInt(0, 9);
            data.y = getRandomInt(0, 9);
        }
    }
    if (game.turn === data.indexPlayer && !enemyPlayer.shots.has(`${data.x}${data.y}`)) {
        game.lastStatus = 'miss';
        const enemyShips = enemyPlayer.ships;
        let result = '';
        for (let i = 0; i < enemyShips.length; i++) {
            if (enemyShips[i].direction) {
                if (enemyShips[i].position.y <= data.y &&
                    enemyShips[i].position.y + (enemyShips[i].length - 1) >= data.y &&
                    enemyShips[i].position.x === data.x) {
                    if (enemyShips[i].shots) enemyShips[i].shots++;
                    else enemyShips[i].shots = 1;
                    if (enemyShips[i].shots >= enemyShips[i].length) {
                        result = getKill(data.x, data.y, enemyPlayer, enemyShips[i], data.indexPlayer);
                        game.lastStatus = 'killed';
                        enemyShips.splice(i, 1);
                        if (!enemyShips.length) {
                            result = [{
                                type: 'finish',
                                data: JSON.stringify({
                                    winPlayer: data.indexPlayer,
                                }),
                                id: 0,
                            }];
                            const player = PLAYERS.find((play) => play.id === data.indexPlayer);
                            const winner = WINNERS.find((winn) => winn.name === player.name);
                            if (winner) winner.wins++;
                            else WINNERS.push({
                                name: player.name,
                                wins: 1,
                            });
                        }
                    }
                    else {
                        result = getShot(data.x, data.y, data.indexPlayer);
                        game.lastStatus = 'shot';
                    }
                }
            } else {
                if (enemyShips[i].position.x <= data.x &&
                    enemyShips[i].position.x + (enemyShips[i].length - 1) >= data.x &&
                    enemyShips[i].position.y === data.y) {
                    if (enemyShips[i].shots) enemyShips[i].shots++;
                    else enemyShips[i].shots = 1;
                    if (enemyShips[i].shots >= enemyShips[i].length) {
                        result = getKill(data.x, data.y, enemyPlayer, enemyShips[i], data.indexPlayer);
                        game.lastStatus = 'killed';
                        enemyShips.splice(i, 1);
                        if (!enemyShips.length) {
                            result = [{
                                type: 'finish',
                                data: JSON.stringify({
                                    winPlayer: data.indexPlayer,
                                }),
                                id: 0,
                            }];
                            const player = PLAYERS.find((play) => play.id === data.indexPlayer);
                            const winner = WINNERS.find((winn) => winn.name === player.name);
                            if (winner) winner.wins++;
                            else WINNERS.push({
                                name: player.name,
                                wins: 1,
                            });
                        }
                    }
                    else {
                        result = getShot(data.x, data.y, data.indexPlayer);
                        game.lastStatus = 'shot';
                    }
                }
            }
        }
        enemyPlayer.shots.add(`${data.x}${data.y}`);
        const readyPlayerWS = PLAYERS
            .find((player) => player.id === enemyPlayer.id).ws;
        const readyPlayerResult = result ? result : getMiss(data.x, data.y, data.indexPlayer);
        for (let i = 0; i < readyPlayerResult.length; i++) {
            readyPlayerWS.send(JSON.stringify(readyPlayerResult[i]));
        }
        return result ? result : getMiss(data.x, data.y, data.indexPlayer);
    } else game.lastStatus = 'erorr';
    return [{}];
}

function getKill(x, y, enemy, eShip, id) {
    const result = [
        {
            type: 'attack',
            data: JSON.stringify({
                position: {
                    x,
                    y,
                },
                currentPlayer: id,
                status: 'killed',
            }),
            id: 0
        },
    ];
    const xlength = eShip.direction ? 1 : eShip.length;
    const ylength = !eShip.direction ? 1 : eShip.length;
    for (let ix = -1; ix <= xlength; ix++) {
        for (let iy = -1; iy <= ylength; iy++) {
            if (eShip.position.x + ix >= 0 &&
                eShip.position.y + iy >= 0) {
                if (eShip.direction) {
                    if (!(eShip.position.y + iy >= eShip.position.y &&
                        eShip.position.y + iy <= eShip.position.y + eShip.length - 1 &&
                        eShip.position.x + ix === eShip.position.x)) {
                        result.push(
                            ...getMiss(eShip.position.x + ix, eShip.position.y + iy, id)
                        );
                        enemy.shots.add(`${eShip.position.x + ix}${eShip.position.y + iy}`);
                    }
                } else {
                    if (!(eShip.position.x + ix >= eShip.position.x &&
                        eShip.position.x + ix <= eShip.position.x + eShip.length - 1 &&
                        eShip.position.y + iy === eShip.position.y)) {
                        result.push(
                            ...getMiss(eShip.position.x + ix, eShip.position.y + iy, id)
                        );
                        enemy.shots.add(`${eShip.position.x + ix}${eShip.position.y + iy}`);
                    }
                }
            }
        }
    }
    return result;
}

function getShot(x, y, id) {
    return [
        {
            type: 'attack',
            data: JSON.stringify({
                position: {
                    x,
                    y,
                },
                currentPlayer: id,
                status: 'shot',
            }),
            id: 0
        },
    ];
}

function getMiss(x, y, id) {
    return [
        {
            type: 'attack',
            data: JSON.stringify({
                position: {
                    x,
                    y,
                },
                currentPlayer: id,
                status: 'miss',
            }),
            id: 0
        },
    ];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}