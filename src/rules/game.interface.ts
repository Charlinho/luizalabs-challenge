interface Game {
    total_kills: 0,
    players: Player [],
    kills: {}
}

interface Player {
    name: string;
}

export default Game;