import crypto from 'crypto';
import { Base32 } from 'base-coding';

import { addLeadingZeros, convertNumberIntoBytes, Digits, isBase32 } from './utils';

/**
 * @deprecated
 */
export class Hotp {
  public create(secret: string, counter: number, digits: Digits = 6): string {
    if (isBase32(secret)) {
      secret = Base32.decode(secret);
    }
    if (!secret) {
      console.warn('No secret provided to generate an hotp.\n\r\n\rReturn.');
      return '';
    }
    if (secret.length < 160) {
      console.warn('RFC4226 recommends, that the length of a secret is at least 160 bits.');
    }
    const hmacResult = this.createHmac(secret, counter);
    let hotp = this.truncate(hmacResult, digits);
    hotp = addLeadingZeros(hotp, digits);
    return hotp;
  }

  public verify(code: string, secret: string, counter: number): boolean {
    if (code.length < 6 || code.length > 8) {
      throw new Error('Undefined length of code.');
    }
    const comparison = this.create(secret, counter, code.length as Digits);
    return code === comparison;
  }

  protected createHmac(secret: string, counter: number | string): string {
    if (typeof counter === 'string') {
      counter = parseInt(counter, 10);
    }
    return crypto
      .createHmac('sha1', secret)
      .update(Buffer.from(convertNumberIntoBytes(counter)))
      .digest('hex');
  }

  protected truncate(hmacResult: string, digits: Digits = 6): string {
    const offset = (parseInt(hmacResult.slice(-2), 16) & 0xf) * 2;
    const binCode =
      ((parseInt(hmacResult.substr(offset, 2), 16) & 0x7f) << 24) |
      ((parseInt(hmacResult.substr(offset + 2, 2), 16) & 0xff) << 16) |
      ((parseInt(hmacResult.substr(offset + 4, 2), 16) & 0xff) << 8) |
      (parseInt(hmacResult.substr(offset + 6, 2), 16) & 0xff);
    const hotp = binCode % Math.pow(10, digits);
    return `${hotp}`;
  }
}
