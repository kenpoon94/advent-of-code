const fs = require("fs");
const readline = require("readline");

const readLineByLine = async () => {
  const fileStream = fs.createReadStream("day1_input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let counter = 0;
  for await (const line of rl) {
    const number = getNumber(line);
    counter += parseInt(number);
  }
  console.log("final", counter);
};

const getNumber = (line: string) => {
  const numberString = line
    .match(/([0-9])/g)
    .toString()
    .replaceAll(",", "");
  if (numberString.length > 0) {
    const firstNumber = numberString.slice(0, 1);
    const lastNumber = numberString.slice(-1);
    return firstNumber + lastNumber;
  }
};

readLineByLine();
