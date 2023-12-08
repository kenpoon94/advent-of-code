const fs = require("fs");
const readline = require("readline");

enum Numerals {
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
}

const readLineByLine = async () => {
  const fileStream = fs.createReadStream("day1_input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let counter = 0;
  for await (const line of rl) {
    const number = getNumber(line);
    console.log(number);
    counter += parseInt(number);
  }
  console.log("final", counter);
};

const getNumber = (line: string) => {
  const arrObj: { index: number; number: number }[] = [];

  for (let index = 0; index <= 9; index++) {
    const firstNumeralIndex = line.indexOf(Numerals[index]);
    const lastNumeralIndex = line.lastIndexOf(Numerals[index]);

    const firstNumericIndex = line.indexOf(index.toString());
    const lastNumericIndex = line.lastIndexOf(index.toString());

    if (firstNumeralIndex >= 0 && lastNumeralIndex >= 0) {
      arrObj.push({ index: firstNumeralIndex, number: index });
      if (firstNumeralIndex !== lastNumeralIndex) {
        arrObj.push({ index: lastNumeralIndex, number: index });
      }
    }
    if (firstNumericIndex >= 0 && lastNumericIndex >= 0) {
      arrObj.push({ index: firstNumericIndex, number: index });
      if (firstNumericIndex !== lastNumericIndex) {
        arrObj.push({ index: lastNumericIndex, number: index });
      }
    }
  }
  arrObj.sort((a, b) => a.index - b.index);
  const firstNumber = arrObj[0].number.toString();
  const lastNumber = arrObj[arrObj.length - 1].number.toString();
  return firstNumber + lastNumber;
};

readLineByLine();
