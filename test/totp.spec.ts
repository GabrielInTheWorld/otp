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
  const totp = FakeUtils.createTotp(1608712290, 'JBSWY3DPEBLW64TMMQ', 0, 6);
  const totp2 = FakeUtils.createTotp(1608712320, 'JBSWY3DPEBLW64TMMQ', 0, 6);
  const totp3 = FakeUtils.createTotp(1608712350, 'JBSWY3DPEBLW64TMMQ', 0, 6);
  console.log('totp', totp);
  console.log('totp2', totp2);
  console.log('totp3', totp3);
  expect(totp).toBe('0');
});
