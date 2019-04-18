import Game from './game.interface';
import ReadFileRule from './read-file.rule';
import FileAdapter from '../adapters/file-adapter';

const GameRule = {
    getMatches: () => _getMatcheFromFile()
}

const games: Game[] = [];

function _getMatcheFromFile(): Promise<any> {
   return new Promise((resolve) => {

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
                    
                    if (ReadFileRule.isPlayerLine(nextLine)) {

                        const playerName = ReadFileRule.getPlayerName(nextLine);
                        
                        if (game.players.length === 0) {
                            game.players.push({name: playerName});
                        }

                        if (game.kills.length === 0) {
                            game.kills.push({name: playerName, score: 0});
                        }
                
                        if (!game.players.find((p) => p.name === playerName)) {
                            game.players.push({name: playerName});
                            game.kills.push({name: playerName, score: 0});
                        }
                    }
                
                    if (ReadFileRule.isKillLine(nextLine)) {                        
                        game.kills.forEach((kill) => {
                            
                            if (ReadFileRule.isSucideLine(nextLine, kill.name)) {
                                kill.score = kill.score - 1;
                                return
                            }

                            if (ReadFileRule.isKillerLine(nextLine, kill.name)) {
                                kill.score = kill.score + 1;
                                game.total_kills = game.total_kills + 1;
                            }
                        });
                    }

                    index++;
                    nextIndex++;
                }
                
                games.push(game);
            }

            index++;
        }

        resolve(games);

        });
   });
}

function getEmptyGame(): Game {
    return { total_kills: 0, kills: [], players: [] };
}

export default GameRule;