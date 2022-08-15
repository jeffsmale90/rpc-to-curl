#!/usr/bin/env node

import { Command } from "commander";
import { toCurl } from "./index.js";

const command = new Command();

command
  .option("-o|--output-only", "output CURL command only, don't execute.", false)
  .option("-u|--url <string>", "RPC URL", "http://localhost:8545");
command.parse();
const options = command.opts();

const isOutputOnly = options.outputOnly;
const url = options.url;
const parameterString = command.args[0];

toCurl({
  isOutputOnly,
  parameterString,
  url,
});
