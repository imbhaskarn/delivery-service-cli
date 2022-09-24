const process = require("process");
const args = process.argv.slice(2);

class Args {
	constructure() {
		this.args = args;
	}
	args() {
		let args = {};
		if (this.args[0] === "cost") {
			(args.baseDeliveryCost = this.args[0]),
				(args.noOfPackages = this.args[1]),
				(args.packageId = this.args[2]),
				(args.packageWeight = this.args[3]),
				(args.distance = this.args[4]);
		}
        if (this.args[0] === "time") {
			(args.baseDeliveryCost = this.args[0]),
				(args.noOfPackages = this.args[1]),
				(args.packageId = this.args[2]),
				(args.packageWeight = this.args[3]),
				(args.distance = this.args[4]);
		}
        return args
	}
}

module.exports = Args;
