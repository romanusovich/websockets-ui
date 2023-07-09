import { PLAYERS } from "../data/players.js";

export function reg(data) {
    const newPlayer = {
        id: PLAYERS.length + 1,
        name: data.name,
        password: data.password,
    };
    const player = PLAYERS.find((value) => value.name === data.name);
    const result = {
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
    } catch (e) {
        result.data.error = true;
        result.data.errorText = e.message;
    }
    result.data = JSON.stringify(result.data);
    return result;
};