import { PLAYERS } from "../data/players.js";

export function reg(data) {
    const newPlayer = {
        id: PLAYERS.length + 1,
        name: data.name,
        password: data.password,
    };
    const result = {
        name: newPlayer.name,
        index: newPlayer.id,
        error: false,
        errorText: '',
    };
    try {
        PLAYERS.push(newPlayer);
    } catch (e) {
        result.error = true;
        result.errorText = e.message;
    }
    return result;
};