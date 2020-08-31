import { Path } from '@angular-devkit/core';
import { chain, FileEntry, filter, forEach, Rule } from '@angular-devkit/schematics';
const CryptoJS = require('crypto-js');

const DELIMITER = '%%';

export function decodeSource(options: {password: string}): Rule {
    return () => {
        return chain([
            // We work under src folder only
            filter((path: Path) => path.startsWith('/src/')),

            // Select only *.ts and *.html files
            filter((path: Path) => path.endsWith('.ts') || path.endsWith('.html')),

            // Encode every %%phrase%% into %%hex%%
            forEach((fileEntry: FileEntry) => {
                let content = fileEntry.content.toString();
                let nextDelimiterIndex = content.indexOf(DELIMITER);
                while (nextDelimiterIndex !== -1) {
                    const delimiterIndexEnd = content.indexOf(DELIMITER, nextDelimiterIndex + DELIMITER.length);
                    const phrase = content.slice(nextDelimiterIndex + DELIMITER.length, delimiterIndexEnd);
                    console.log(phrase);
                    const encodedPhrase = CryptoJS.AES.decrypt(phrase, options.password).toString(CryptoJS.enc.Utf8);
                    content = content.replace(`${DELIMITER}${phrase}${DELIMITER}`, `${DELIMITER}${encodedPhrase}${DELIMITER}`);
                    const nextStartIndex = nextDelimiterIndex + encodedPhrase.length + DELIMITER.length * 2;
                    nextDelimiterIndex = content.indexOf(DELIMITER, nextStartIndex);
                }

                return {
                    content: Buffer.from(content),
                    path: fileEntry.path,
                };
            }),
        ]);
    };
}
