import fs from 'fs';
import path from 'path';
import es from 'event-stream';

const filePath = '../__files/games.log';

const lines: Array<string> = [];

const fileAdapter = {
    read: () => {
        const file = fs.createReadStream(path.join(__dirname, filePath))
            .pipe(es.split())
            .pipe(es.mapSync((line: string) => {
                file.resume();
                
                lines.push(line);
            }));
        
        return file;
    },
    getLines: (): Array<string> => {
        return lines;
    }
}

export default fileAdapter;
