import fs from 'fs';
import { Transform } from 'stream';

fs.createReadStream("input.txt", "utf-8")
    .pipe(toUpperCase())
    .pipe(fs.createWriteStream("output.txt"));

function toUpperCase() {
    return new Transform({
        transform(chunk, encoding, callback) {
            const upperChunk = chunk.toString().toUpperCase();
            callback(null, upperChunk);
        }
    }); 
}