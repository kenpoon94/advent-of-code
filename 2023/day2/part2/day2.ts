const fs = require("fs");
const readline = require("readline");

enum Colors {
  red = "red",
  green = "green",
  blue = "blue",
}

const readLineByLine = async () => {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let counter = 0;
  for await (const line of rl) {
    counter += getID(line);
  }
  console.log("final", counter);
};

const getID = (line: string): number => {
  const game = line
    .replace(/Game ([0-9]+): /g, "")
    .replaceAll(" ", "")
    .replaceAll(";", ",")
    .split(",");

  let red = 0;
  let blue = 0;
  let green = 0;

  game.forEach((round) => {
    if (round.indexOf(Colors.red) > 0) {
      red = getCount(round) > red ? getCount(round) : red;
    }
    if (round.indexOf(Colors.blue) > 0) {
      blue = getCount(round) > blue ? getCount(round) : blue;
    }
    if (round.indexOf(Colors.green) > 0) {
      green = getCount(round) > green ? getCount(round) : green;
    }
  });

  return red * blue * green;
};

const getCount = (line: string) => {
  const numArr = line.match(/[0-9]+/g);
  return parseInt(numArr[0]);
};

readLineByLine();
