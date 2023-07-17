import { PLAYERS } from "../data/players.js";
import { User, WSResponse, regData } from "../types.js";

export function reg(data: regData, ws: WebSocket): WSResponse {
    const newPlayer: User = {
        id: PLAYERS.length + 1,
        name: data.name,
        password: data.password,
        ws,
    };
    const player: User | undefined = PLAYERS.find((value) => value.name === data.name);
    const result: any = {
        type: 'reg',
        data: {
            name: player ? player.name : newPlayer.name,
            index: player ? player.id : newPlayer.id,
            error: false,
            errorText: '',
        },
        id: 0,
    };
    try {
        if (player && player.password !== data.password) throw new Error('Wrong password');
        if (!player) PLAYERS.push(newPlayer);
    } catch (e: any) {
        result.data.error = true;
        result.data.errorText = e.message;
    }
    result.data = JSON.stringify(result.data);
    return result;
};