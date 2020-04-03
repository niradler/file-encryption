#!/usr/bin/env node
const main = require("./main");
const Yargs = require("yargs"); // eslint-disable-line

Yargs.usage("file-encryption [command]");

Yargs.command(
  "encrypt",
  "encrypt file.",
  (yargs) => {
    yargs.positional("path", {
      describe: "path to file.",
      require: true,
    });
    yargs.positional("key", {
      describe: "decryption key.",
      require: true,
    });
  },
  (argv) => {
    if (argv.v) console.log(argv);
    main("encrypt", argv);
  }
)
  .command(
    "decrypt",
    "decrypt file.",
    (yargs) => {
      yargs.positional("path", {
        describe: "path to file.",
        require: true,
      });
      yargs.positional("key", {
        describe: "encryption key.",
        require: true,
      });
    },
    (argv) => {
      if (argv.v) console.log(argv);
      main("decrypt", argv);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  }).argv;

if (Yargs.argv["_"].length == 0) {
  Yargs.showHelp();
}
