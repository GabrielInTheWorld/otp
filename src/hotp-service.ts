import crypto from 'crypto';
import { Base32 } from 'base-coding';

import { addLeadingZeros, Digits } from './utils';

export class Hotp {
  public create(secret: string, counter: number, digits: Digits = 6): string {
    if (this.isBase32(secret)) {
      secret = Base32.decode(secret);
    }
    const hmacResult = this.createHmac(secret, counter);
    let hotp = this.truncate(hmacResult, digits);
    hotp = addLeadingZeros(hotp, digits);
    return hotp;
  }

  protected createHmac(secret: string, counter: number | string): string {
    if (typeof counter === 'string') {
      counter = parseInt(counter, 10);
    }
    return crypto
      .createHmac('sha1', secret)
      .update(Buffer.from(this.convertNumberToBytes(counter)))
      .digest('hex');
  }

  protected convertNumberToBytes(toConvert: number): number[] {
    const bytes: number[] = this.createArray(8);
    for (let i = bytes.length - 1; i >= 0; --i) {
      bytes[i] = toConvert & 0xff;
      toConvert >>= 8;
    }
    return bytes;
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

  protected createArray(length: number, defaultValue: number = 0): number[] {
    const result: number[] = [];
    for (let i = 0; i < length; ++i) {
      result.push(defaultValue);
    }
    return result;
  }

  protected isBase32(input: string): boolean {
    const regex = /^[A-Z0-7]+=*$/g;
    return regex.test(input);
  }
}
