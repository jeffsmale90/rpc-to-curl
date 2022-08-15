#!/usr/bin/env node

import chalk from "chalk";
import { exec } from "child_process";

let host = process.argv[process.argv.length - 2];
const argumentsStr = process.argv[process.argv.length - 1];

if (host === "localhost") {
  host = "http://localhost:8545";
} else if (host === "infura") {
  host = "https://mainnet.infura.io/v3/0e96090b2eb34ea293a23feec9594e20";
}

const postData = {
  ...JSON.parse(argumentsStr),
  id: 1,
  jsonrpc: "2.0",
};

const command = `curl -s ${host} -X POST -H "Content-Type:application/json;" -d '${JSON.stringify(
  postData
)}'`;

console.log();
//console.log(chalk.yellow(command));
console.log();

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(chalk.yellow(command));
    console.log();
    console.error(chalk.red(error.message));
    return;
  }
  if (stderr) {
    console.log(chalk.yellow(command));
    console.log();
    console.error(chalk.red(stderr));
    return;
  }
  console.log(stdout);
});
