import { FakeUtils } from './utils';

test('Totp T 59', () => {
  const totp = FakeUtils.createTotp(59);
  expect(totp).toBe('94287082');
});

test('Totp T 1111111109', () => {
  const totp = FakeUtils.createTotp(1111111109);
  expect(totp).toBe('07081804');
});

test('Totp T 1111111111', () => {
  const totp = FakeUtils.createTotp(1111111111);
  expect(totp).toBe('14050471');
});

test('Totp T 1234567890', () => {
  const totp = FakeUtils.createTotp(1234567890);
  expect(totp).toBe('89005924');
});

test('Totp base32 secret', () => {
  const isCorrect = FakeUtils.verifyTotp('875110', 1608712290, 'JBSWY3DPEBLW64TMMQ');
  expect(isCorrect).toBe(true);
});

test('Totp verify T + 0', () => {
  const t1 = Math.round(new Date().getTime() / 1000);
  const totp = FakeUtils.createTotp(t1);
  const isCorrect = FakeUtils.verifyTotp(totp, t1);
  expect(isCorrect).toBe(true);
});

test('Totp verify T + 30', () => {
  const t1 = Math.round(new Date().getTime() / 1000);
  const totp = FakeUtils.createTotp(t1 + 30);
  const isCorrect = FakeUtils.verifyTotp(totp, t1);
  expect(isCorrect).toBe(true);
});

test('Totp verify T + 60', () => {
  const t1 = Math.round(new Date().getTime() / 1000);
  const totp = FakeUtils.createTotp(t1 + 60);
  const isCorrect = FakeUtils.verifyTotp(totp, t1);
  expect(isCorrect).toBe(true);
});

test('Totp verify T + 90', () => {
  const t1 = Math.round(new Date().getTime() / 1000);
  const totp = FakeUtils.createTotp(t1 + 90);
  const isCorrect = FakeUtils.verifyTotp(totp, t1);
  expect(isCorrect).toBe(false);
});
