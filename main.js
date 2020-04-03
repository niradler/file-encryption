const encryption = require("./encryption");
const Path = require("path");
const fs = require("fs");

const exitWith = (code = 0, message) => {
  if (message && code == 0) console.log(message);
  if (message && code != 0) console.error(message);
  process.exit(code);
};

const main = async (cmd, args = {}) => {
  try {
    switch (cmd) {
      case "encrypt":
        {
          const { path, key } = args;
          const code = encryption.createKey(key);
          const file = fs.readFileSync(Path.join(process.cwd(), path));
          const coded = encryption.encrypt(file.toString(), code);
          fs.writeFileSync(Path.join(process.cwd(), path), coded);
        }
        break;

      case "decrypt":
        {
          const { path, key } = args;
          const code = encryption.createKey(key);
          const file = fs.readFileSync(Path.join(process.cwd(), path));
          const coded = encryption.decrypt(file.toString(), code);
          fs.writeFileSync(Path.join(process.cwd(), path), coded);
        }
        break;

      default: {
        throw new Error("cmd not found");
      }
    }

    exitWith(0, "Complete!");
  } catch (error) {
    exitWith(1, error.message);
  }
};

module.exports = main;
