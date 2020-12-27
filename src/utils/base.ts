const OUTPUT_GROUPS = 8;
const BITS = 8;
const BASE32_BITS = 5;

export namespace Base32 {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const padding = '=';

  export function encode(toEncode: string): string {
    let bytes = '';
    let result = '';
    for (let i = 0; i < toEncode.length; ++i) {
      const charCode = toEncode.charCodeAt(i);
      bytes = bytes.concat(addLeadingZeros(charCode.toString(2)));
    }
    bytes = addTrailingZeros(bytes, BASE32_BITS);
    for (let i = 0; i < bytes.length; i += BASE32_BITS) {
      const index = parseInt(bytes.substr(i, BASE32_BITS), 2);
      const char = alphabet.charAt(index);
      result = result.concat(char.toString());
    }
    result = addPadding(result, OUTPUT_GROUPS);
    return result;
  }

  export function decode(toDecode: string): string {
    const encoded = toDecode.substring(0, toDecode.indexOf(padding));
    let bytes = '';
    for (let i = 0; i < encoded.length; ++i) {
      const char = encoded.charAt(i);
      const base32Byte = addLeadingZeros(alphabet.indexOf(char).toString(2), BASE32_BITS);
      bytes = bytes.concat(base32Byte);
    }
    let decoded = '';
    for (let i = 0; i < bytes.length; i += BITS) {
      const charCode = parseInt(bytes.substr(i, BITS), 2);
      if (charCode === 0) {
        continue;
      }
      if (charCode >= 1 && charCode < 32) {
        throw new Error(`Unknown charakter ${charCode} after ${i} bits.`);
      }
      decoded = decoded.concat(String.fromCharCode(charCode));
    }
    return decoded;
  }

  function addPadding(input: string, size: number): string {
    let result = input;
    while (result.length % size !== 0) {
      result = result.concat(padding);
    }
    return result;
  }

  function addLeadingZeros(input: string, size: number = BITS): string {
    let result = input;
    while (result.length % size !== 0) {
      result = `0${input}`;
    }
    return result;
  }

  function addTrailingZeros(input: string, bits: number): string {
    let result = input;
    while (result.length % bits !== 0) {
      result = result.concat('0');
    }
    return result;
  }
}
