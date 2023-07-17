export type WSRequest = {
    type: 'reg' | 'create_room' | 'add_user_to_room' | 'add_ships' | 'attack' | 'randomAttack',
    data: regData | createRoomData | addUserData | addShipsData | attackData | randomData,
    id: 0 | number,
};

export type regData = {
    name: string,
    password: string,
};

export type createRoomData = string;

export type addUserData = {
    indexRoom: number,
};

export type addShipsData = {
    gameId: number,
    ships: Ship[],
    indexPlayer: number,
};

export type attackData = {
    gameId: number,
    x: number,
    y: number,
    indexPlayer: number,
};

export type randomData = {
    gameId: number,
    indexPlayer: number,
};

export type User = {
    id: number,
    name: string,
    password: string,
    ws: WebSocket,
};

export type Winner = {
    name: string,
    wins: number,
};

export type Room = {
    roomId: number,
    roomUsers: {
        name: string,
        index: number,
    }[],
};

export type Ship = {
    position: {
        x: number,
        y: number,
    },
    direction: boolean,
    length: number,
    shots: number,
    type: "small" | "medium" | "large" | "huge",
};

export type Game = {
    idGame: number,
    firstPlayer: GameUser,
    secondPlayer: GameUser,
    turn: number,
    lastStatus: "miss" | "killed" | "shot" | "error" | string,
}

export type GameUser = {
    id: number,
    ships: Ship[],
    shots: Set<string>,
};

export type WSResponse = {
    type: 'reg' | 'update_winners' | 'create_game' | 'update_room' | 'start_game' | 'attack' | 'turn' | 'finish' | string,
    data: regRData | updWinnersRData | createGameRData | updRoomRData | startGameRData | attackRData | turnRData | finishRData | string,
    id: 0 | number,
};

export type regRData = {
    name: string,
    index: number,
    error: boolean,
    errorText: string,
};

export type updWinnersRData = Winner[];

export type createGameRData = {
    idGame: number,
    idPlayer: number,
};

export type updRoomRData = Room[];

export type startGameRData = {
    ships: Ship[],
    currentPlayerIndex: number,
};

export type attackRData = {
    position:
    {
        x: number,
        y: number,
    },
    currentPlayer: number,
    status: "miss" | "killed" | "shot",
};

export type turnRData = {
    currentPlayer: number,
};

export type finishRData = {
    winPlayer: number,
};