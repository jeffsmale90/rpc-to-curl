#!/usr/bin/env node

import { Command } from "commander";
import { toCurl } from "./index.js";
import dotenv from "dotenv";

dotenv.config();
const hostsString = process.env.TOCURL_HOSTS;

let hosts = {
  localhost: "http://localhost:8545",
};
if (hostsString !== undefined) {
  hosts = {
    ...hosts,
    ...JSON.parse(hostsString),
  };
}

const command = new Command();

command
  .option("-o|--output-only", "output CURL command only, don't execute.", false)
  .option("-u|--url <string>", "RPC URL", hosts.localhost);
command.parse();
const options = command.opts();

const isOutputOnly = options.outputOnly;
let url = options.url;
if (hosts[url]) {
  url = hosts[url];
}
const parameterString = command.args[0];

toCurl({
  isOutputOnly,
  parameterString,
  url,
});
