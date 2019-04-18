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
    score: number;
}

export default Game;