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
