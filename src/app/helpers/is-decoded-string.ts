// Escaped so schematic won't convert this value
export const DECODED_DELIMITER = '\%\%';

export function isDecodedString(value: string): boolean {
    return value.startsWith(DECODED_DELIMITER) && value.endsWith(DECODED_DELIMITER);
}
