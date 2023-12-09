// const readline = require("readline");
import * as fs from "fs";
import * as readline from "readline";

const readLineByLine = async () => {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let lineLength = 0;
  let lines: string[] = [];
  rl.on("line", (line) => {
    lines.push(line);
  });

  rl.on("close", (line) => {
    lineLength = lines[0].length - 1;
    console.log(lineLength);
    execute(lines);
  });

  const execute = (lines: string[]) => {
    lines.forEach((line, index) => {
      console.log("Checking on line " + index);
      findSymbolIndex(line);

      if (index === 0) {
      }

      if (index === lines.length - 1) {
        const secondLastLine = lines[lines.length - 2];
      }
    });
  };

  const readAdjacentNumbers = (index: number, line: string) => {
    let regexp = /[^0-9.\n]([0-9]+)|([0-9]+)[^0-9.\n]/g;

    let matches = [...line.matchAll(regexp)];
    matches.forEach((match) => {
      console.log("Adjacent found at " + match);
    });

    if (index === 0) {
      // check 0 and 1
    } else if (index === lineLength) {
      //check lineLength - 1 and lineLength
    } else {
      // left = index - 1;
    }
  };

  const findSymbolIndex = (line: string) => {
    const indexes = [];
    let regexp = /[^0-9.\n]/g;

    let matches = [...line.matchAll(regexp)];
    matches.forEach((match) => {
      console.log("Symbol found at " + match.index);
      indexes.push(match.index);
    });

    if (indexes.length > 0) {
      // find adjacent number within this line
      indexes.forEach((index) => {
        readAdjacentNumbers(index, line);
      });
    } else {
      console.log("No symbol found");
    }
  };
};

readLineByLine();
