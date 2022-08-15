#!/usr/bin/env node

import { Command } from "commander";
import { toCurl } from "./index.js";
import dotenv from "dotenv";

dotenv.config();
const hostsString = process.env.TOCURL_HOSTS;

let knownHosts = {
  localhost: "http://localhost:8545",
};
if (hostsString !== undefined) {
  knownHosts = {
    ...knownHosts,
    ...JSON.parse(hostsString),
  };
}

const command = new Command();

command
  .option("-o|--output-only", "output CURL command only, don't execute.", false)
  .option("-u|--url <string>", "RPC URL", knownHosts.localhost);
command.parse();
const options = command.opts();

const isOutputOnly = options.outputOnly;
let url = options.url;
if (knownHosts[url]) {
  url = knownHosts[url];
}

toCurl({
  isOutputOnly,
  rpcArgs: command.args[0],
  url,
});
