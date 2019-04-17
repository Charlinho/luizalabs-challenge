import Game from './game.interface';
import ReadFileRule from './read-file.rule';
import FileAdapter from '../adapters/file-adapter';

const GameRule = {
    getMatches: () => _getMatcheFromFile()
}

function _getMatcheFromFile(): void {
    FileAdapter.read().on('end', () => {
        
        let index = 0;
        let game: Game;

        const lines = FileAdapter.getLines();

        while (index < lines.length) {

            const line = lines[index];

            if (ReadFileRule.isStartGame(line)) {

                let nextIndex = index + 1;
                
                game = getEmptyGame();

                while (ReadFileRule.isGameLine(lines[nextIndex])) {

                    const nextLine = lines[nextIndex];
                    
                    game = buildGame(game, nextLine);
                    
                    index++;
                    nextIndex++;
                }
            
                console.log(game);
            }

            index++;
        }
    });
}

function getEmptyGame(): Game {
    return { total_kills: 0, kills: [], players: [] };
}

function buildGame(game: Game, nextLine: string): Game {

    if (ReadFileRule.isPlayerLine(nextLine)) {

        const player = ReadFileRule.getPlayer(nextLine);
        
        if (game.players.length === 0) {
            game.players.push(player);
        }

        if (!game.players.find((p) => p === player)) {
            game.players.push(player);
        }
    }

    if (ReadFileRule.isKillLine(nextLine)) {
        game.total_kills = game.total_kills + 1;

        game.kills = [{name: '', amount: 0}];
    }

    return {...game};
}

export default GameRule;