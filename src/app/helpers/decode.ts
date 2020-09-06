import CryptoES from 'crypto-es';

import { ENCODED_DELIMITER } from './is-encoded-string';

/**
 * Returns decrypted phrase with specified hash or provided value
 * when decryption is unsuccesful (in case hash is not an AES-encrypted
 * string) or empty string in rare cases
 */
export function decode(hash: string, password: string): string {
    const actualValue = hash.split(ENCODED_DELIMITER).filter(Boolean)[0];
    try {
        const decodedValue = CryptoES.AES.decrypt(actualValue, password).toString(CryptoES.enc.Utf8);

        return decodedValue;
    } catch {
        return hash;
    }
}
