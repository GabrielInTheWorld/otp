type Digits = 6 | 7 | 8;

function addLeadingZeros(numberAsString: string, expectedLength: number): string {
  let result = numberAsString;
  while (result.length < expectedLength) {
    result = `0${result}`;
  }
  return result;
}

export { Digits, addLeadingZeros };
