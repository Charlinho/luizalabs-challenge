import Game from './game.interface';
import fileAdapter from '../adapters/file-adapter';

// const games: Array<Game> = [];

const GameRule = {
    getMatches: () => _getMatcheFromFile()
}

function _getMatcheFromFile(): void {
    fileAdapter.read().on('end', () => {
        
        let index = 0;
        let game: Game;

        while (index < fileAdapter.getLines().length) {

            const line = fileAdapter.getLines()[index];

            if (_isStartGame(line)) {

                let nextIndex = index + 1;
                
                game = {total_kills: 0, kills: {}, players: []};

                while (_isGameLine(fileAdapter.getLines()[nextIndex])) {

                    const nextLine = fileAdapter.getLines()[nextIndex];

                    if (_isKillLine(nextLine)) {
                        game.total_kills = game.total_kills + 1;
                    }

                    if (_isPlayerLine(nextLine)) {
                        console.log(_getPlayer(nextLine));
                    }
                    
                    index++;
                    nextIndex++;
                }
            
                // console.log(game);
            }

            index++;
        }
    });
}

function _getPlayer(line: string): any {
    const playerName = line.match(/(?<=n\\)(.*?)(?=[\\])/g);
    return playerName ? playerName[0] : null;
}

function _isPlayerLine(line: string): boolean {
    return !!line.match(/ClientUserinfoChanged/g);
}

function _isKillLine(line: string): boolean {
    return !!line.match(/Kill/g)
}

function _isGameLine(line: string): boolean {
    return !_isEndGame(line) && !_isStartGame(line) ;
}

function _isEndGame(line: string): boolean {
    return !!line.match(/ShutdownGame/g);
}

function _isStartGame(line: string): boolean {
    return !!line.match(/InitGame/g);
}

export default GameRule;