#!/usr/bin/env node
import chalk from "chalk";
import { exec } from "child_process";
import JSON5 from "json5";

/*
  options: {url: string, parameterString: string, isOutputOnly: boolean}
*/
export function toCurl(options) {
  const { parameterString, url, isOutputOnly } = options;

  const postData = {
    id: 1,
    jsonrpc: "2.0",
    ...JSON5.parse(parameterString),
  };

  const command = `curl -s ${url} -X POST -H "Content-Type:application/json;" -d '${JSON.stringify(
    postData
  )}'`;

  console.log();
  if (isOutputOnly) {
    console.log(chalk.yellow(command));
  } else {
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
  }
}
