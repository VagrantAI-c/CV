import { Path } from '@angular-devkit/core';
import { chain, FileEntry, filter, forEach, Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
const CryptoJS = require('crypto-js');

const ENCODED_DELIMITER = '##';
const DECODED_DELIMITER = '%%';

export function decodeSource(options: Schema): Rule {
    return () => {
        return chain([
            // We work under src folder only
            filter((path: Path) => path.startsWith('/src/')),

            // Select only *.ts and *.html files
            filter((path: Path) => path.endsWith('.ts') || path.endsWith('.html')),

            // Encode every %%phrase%% into %%hex%%
            forEach((fileEntry: FileEntry) => {
                let content = fileEntry.content.toString();
                let nextDelimiterIndex = content.indexOf(ENCODED_DELIMITER);
                while (nextDelimiterIndex !== -1) {
                    const delimiterIndexEnd = content.indexOf(ENCODED_DELIMITER, nextDelimiterIndex + ENCODED_DELIMITER.length);
                    const phrase = content.slice(nextDelimiterIndex + ENCODED_DELIMITER.length, delimiterIndexEnd);
                    const encodedPhrase = CryptoJS.AES.decrypt(phrase, options.password).toString(CryptoJS.enc.Utf8);

                    const from = `${ENCODED_DELIMITER}${phrase}${ENCODED_DELIMITER}`;
                    const to = `${DECODED_DELIMITER}${encodedPhrase}${DECODED_DELIMITER}`;
                    content = content.replace(from, to);

                    const nextStartIndex = nextDelimiterIndex + encodedPhrase.length + DECODED_DELIMITER.length * 2;
                    nextDelimiterIndex = content.indexOf(ENCODED_DELIMITER, nextStartIndex);
                }

                return {
                    content: Buffer.from(content),
                    path: fileEntry.path,
                };
            }),
        ]);
    };
}
