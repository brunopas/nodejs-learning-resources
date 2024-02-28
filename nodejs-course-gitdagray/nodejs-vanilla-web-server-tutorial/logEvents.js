const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const path = require("node:path");

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }

    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  } catch (error) {
    console.error(error);
  }
};

module.exports = logEvents;
