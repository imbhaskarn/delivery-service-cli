const chalk = require("chalk");
const success = chalk.hex("#EBEBEB");
const log = console.log;
class Logger {
	static warning(data) {
		log(chalk.red(data));
		return;
	}
}
module.exports = Logger;
