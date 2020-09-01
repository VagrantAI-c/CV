import { Path } from '@angular-devkit/core';
import { chain, FileEntry, filter, forEach, Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
const CryptoJS = require('crypto-js');

const ENCODED_DELIMITER = '\#\#';
const DECODED_DELIMITER = '\%\%';

export function encodeSource(options: Schema): Rule {
    return () => {
        return chain([
            // We work under src folder only
            filter((path: Path) => path.startsWith('/src/')),

            // Select only *.ts and *.html files
            filter((path: Path) => path.endsWith('.ts') || path.endsWith('.html')),

            // Encode every %%phrase%% into %%hex%%
            forEach((fileEntry: FileEntry) => {
                let content = fileEntry.content.toString();
                let nextDelimiterIndex = content.indexOf(DECODED_DELIMITER);
                while (nextDelimiterIndex !== -1) {
                    const delimiterIndexEnd = content.indexOf(DECODED_DELIMITER, nextDelimiterIndex + DECODED_DELIMITER.length);
                    const phrase = content.slice(nextDelimiterIndex + DECODED_DELIMITER.length, delimiterIndexEnd);
                    const encodedPhrase = CryptoJS.AES.encrypt(phrase, options.password).toString();
                    const from = `${DECODED_DELIMITER}${phrase}${DECODED_DELIMITER}`;
                    const to = `${ENCODED_DELIMITER}${encodedPhrase}${ENCODED_DELIMITER}`;
                    content = content.replace(from, to);
                    console.log(`${from} to ${to}`);
                    const nextStartIndex = nextDelimiterIndex + encodedPhrase.length + ENCODED_DELIMITER.length * 2;
                    nextDelimiterIndex = content.indexOf(DECODED_DELIMITER, nextStartIndex);
                }

                return {
                    content: Buffer.from(content),
                    path: fileEntry.path,
                };
            }),
        ]);
    };
}
