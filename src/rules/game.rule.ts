// import Game from './game.interface';
import fileAdapter from '../adapters/file-adapter';

// const games: Game = [];

const GameRule = {
    getMatches: () => {
    
        fileAdapter.read().on('end', () => {
            _getMatchesStarted().forEach(() => {
                
            });
        });

    }
}

function _getMatchesStarted(): Array<string> {
    return fileAdapter.getLines().filter((line: string) => line.match(/InitGame/ig));
}

export default GameRule;