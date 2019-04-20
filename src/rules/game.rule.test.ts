import fs from 'fs';
import path from 'path';
import sinon from 'sinon';
import es from 'event-stream';

import GameRule from './game.rule';
import FileAdapter from '../adapters/file-adapter';
import Game from './game.interface';

describe('Game Rule Test', () => {

    const lines: Array<string> = [];

    it('On read a file, but file dont have lines, should return a empty list', async() => {
        const mock = sinon.mock(FileAdapter);

        mock.expects('read').returns(createMockFile('../__files/games-empty.test.log'));

        const result = await GameRule.getMatches();

        mock.restore();

        expect(result.length).toEqual(0);
    });

    it('On read a file without Start Game line, should return a empty list', async() => {
        const mock = sinon.mock(FileAdapter);

        mock.expects('read').returns(createMockFile('../__files/games-empty.test.log'));
        mock.expects('getLines').returns(lines);

        const result = await GameRule.getMatches();

        mock.restore();

        expect(result.length).toEqual(0);
    });

    it('On read a file, should return matches', async() => {
        const mock = sinon.mock(FileAdapter);

        mock.expects('read').returns(createMockFile('../__files/games.test.log'));
        mock.expects('getLines').returns(lines);

        const result: Array<Game> = await GameRule.getMatches();

        mock.restore();
        
        expect(result.length).toEqual(1);
        expect(result[0].total_kills).toEqual(1);
        expect(result[0].kills).not.toBeNull();
        expect(result[0].players).not.toBeNull()
    });

    function createMockFile(pathFile: string) {
        const file = fs.createReadStream(path.join(__dirname, pathFile))
            .pipe(es.split())
            .pipe(es.mapSync((line: string) => {
                file.resume();

                lines.push(line);
            }));

        return file; 
    }
});