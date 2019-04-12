import Game from './game.interface';
import fileAdapter from '../adapters/file-adapter';

const games: Array<Game> = [];

const GameRule = {
    getMatches: () => _getMatcheFromFile()
}

function _getMatcheFromFile(): void {
    fileAdapter.read().on('end', () => {
        
        let index = 0;

        while (index < fileAdapter.getLines().length) {

            const line = fileAdapter.getLines()[index];

            if (_isStartGame(line)) {

                let nextIndex = index + 1;

                while (_isGameLine(fileAdapter.getLines()[nextIndex])) {

                    const nextLine = fileAdapter.getLines()[nextIndex];

                    if (_isKillLine(nextLine)) {
                        _buildMatch(nextLine);
                    }
                    
                    index++;
                    nextIndex++;
                }
            }

            index++;
        }
    });
}

function _buildMatch(line: string): void {
    const game: Game = {
        total_kills: line.match()
    };
}

function _isKillLine(line: string): boolean {
    return !!line.match(/Kill/ig)
}

function _isGameLine(line: string): boolean {
    return !_isEndGame(line) && !_isStartGame(line) ;
}

function _isEndGame(line: string) {
    return !!line.match(/ShutdownGame/ig);
}

function _isStartGame(line: string): boolean {
    return !!line.match(/InitGame/ig);
}

export default GameRule;