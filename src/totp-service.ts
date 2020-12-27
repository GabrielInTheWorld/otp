import { Hotp } from './hotp-service';
import { Digits } from './utils';

export class Totp {
  private hotp = new Hotp();

  public create(secret: string, t1?: number, t0: number = 0, digits: Digits = 6): string {
    if (!t1) {
      t1 = Math.round(new Date().getTime() / 1000);
    }
    const timeSteps = Math.floor((t1 - t0) / 30);
    return this.hotp.create(secret, timeSteps, digits);
  }
}
