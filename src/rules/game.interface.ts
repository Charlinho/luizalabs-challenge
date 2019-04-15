interface Game {
    kills: {}
    players: Player[],
    total_kills: number,
}

interface Player {
    name: string;
}

export default Game;