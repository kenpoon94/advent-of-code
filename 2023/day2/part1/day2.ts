const fs = require("fs");
const readline = require("readline");

enum Colors {
  red = "red",
  green = "green",
  blue = "blue",
}

enum MaxColors {
  red = 12,
  green = 13,
  blue = 14,
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
  const index = parseInt(line.match(/Game ([0-9]+)/g)[0].replace("Game ", ""));
  const game = line
    .replace(/Game ([0-9]+): /g, "")
    .replaceAll(" ", "")
    .replaceAll(";", ",")
    .split(",");

  let res = index;

  game.every((round) => {
    if (round.indexOf(Colors.red) > 0) {
      if (getCount(round) > MaxColors.red) {
        res = 0;
        return false;
      }
    }
    if (round.indexOf(Colors.blue) > 0) {
      if (getCount(round) > MaxColors.blue) {
        res = 0;
        return false;
      }
    }
    if (round.indexOf(Colors.green) > 0) {
      if (getCount(round) > MaxColors.green) {
        res = 0;
        return false;
      }
    }
    return true;
  });
  return res;
};

const getCount = (line: string) => {
  const numArr = line.match(/[0-9]+/g);
  return parseInt(numArr[0]);
};

readLineByLine();
