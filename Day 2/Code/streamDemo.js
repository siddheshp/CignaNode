import fs from 'fs';
import { Transform } from 'stream';

fs.createReadStream("input.txt", "utf-8")
    .pipe(upperCase())
    .pipe(fs.createWriteStream("output.txt"));

function upperCase() {
    return new Transform({
        transform(chunk, encoding, callback) {
            const upperChunk = chunk.toString().toUpperCase();
            callback(null, upperChunk);
        }
    }); 
}