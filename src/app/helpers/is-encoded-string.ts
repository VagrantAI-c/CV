export const ENCODED_DELIMITER = '\#\#';

export function isEncodedString(value: string): boolean {
    return value.startsWith(ENCODED_DELIMITER) && value.endsWith(ENCODED_DELIMITER);
}
