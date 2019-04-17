interface Game {
    kills: Kill[], 
    players: Player[],
    total_kills: number,
}

interface Player {
    name: string;
}

interface Kill {
    name: string;
    amount: number;
}

export default Game;