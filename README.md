# RPC-to-CURL

A Simple CLI tool for making querying RPC APIs simpler.

### Installation

Run the following to install dependencies, and to install RPC-to-CURL into your global packages:
`npm install -g .`

### Basic usage

You can call RPC-to-CURL with the following syntax:

```
Usage: tocurl [options] <rpc-call>

Options:
  -o|--output-only   output CURL command only, don't execute. (default: false)
  -u|--url <string>  RPC URL (default: "http://localhost:8545")
  -h, --help         display help for command
```

By default RPC-to-CURL will execute the command provided as the <rpc-call> argument.

e.g.,

```
tocurl '{method:"eth_getBlockByNumber", params:["latest",false]}'
```

## Configuring hosts

Known hosts can be configured by setting the environment variable `TOCURL_HOSTS` as a JSON object where the key is a name of the host, and the value is the RPC url. Hint: this can be set in a `.env` file in the project root.

e.g.

Instead of calling infura with:

```
tocurl -u https://mainnet.infura.io/v3/<api-key> '{method:"eth_getBlockByNumber", params:["latest",false]}'
```

Configure the host with the following:

```
TOCURL_HOSTS='{"infura","https://mainnet.infura.io/v3/<api-key>"}}'
```

And requests can be made with:

```
tocurl -u infura '{method:"eth_getBlockByNumber", params:["latest",false]}'
```
