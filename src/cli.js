const { Command } = require("commander");
const chalk = require("chalk");
const DeliveryCost = require("./utils/getCost");
const program = new Command();
const Package = require("./utils/package");
const Vehicle = require('./utils/vehicle')

program
	.name("delivery-cli")
	.description("Cli package for delivery services")
	.version("0.8.0");

program
	.command("cost")
	.description("Calculates cost for packages")
	.requiredOption("-p, --price <char>, base delivery cost of a package")
	.requiredOption("-n, --items <number>, No. of package for cost calculation")
	.option(
		"-ps, --packages <packages...>",
		"Format: [pkgid, pkgweight, distance-from-hub, offer-code]"
	)
	.action((str, options) => {
		const packageString = new Package(
			str.price,
			str.items,
			str.packages,
			"cost"
		);
		const packageList = packageString.parsePackage();
		const validation = packageString.validatePackage(packageList, "cost");
		if (validation.error) {
			console.log(chalk.red(validation.errors));
			return;
		}
		const packageGroup = packageString.packageGroup(packageList);
		const cost = new DeliveryCost(packageGroup);
		const totalCost = cost.calculate();
		totalCost.forEach(item => {
			console.log(`${item.packageId} ${item.discount} ${item.totalCost}`)
		})
	});

program
	.command("time")
	.description("calculate deliveryTime")
	.requiredOption("-p, --price <char>, base delivery cost of a package")
	.requiredOption("-n, --items <number>, No. of package for cost calculation")
	.requiredOption(
		"-vi, --vehicle <number...>",
		"vehicle info like speed numbers and capacity"
	)
	.option(
		"-ps, --packages <packages...>",
		"Format: [pkgid, pkgweight, distance-from-hub, offer-code]"
	)
	.action((str, options) => {
		if (options.args.length > 0) {
			console.log(`Invalid arguments passed: ${options.args.toString()}`);
			return;
		}
		const packageString = new Package(
			str.price,
			str.items,
			str.packages,
			"time",
			str.vehicle
		);
		const packageList = packageString.parsePackage();
		const validation = packageString.validatePackage(
			packageList,
			str.vehicle
		);
		if (validation.error) {
			console.log(chalk.red(validation.errors));
			return 0;
		}
		const packageGroup = packageString.packageGroup(packageList);
		const newVehicle = new Vehicle([2, 70, 200], packageGroup.baseCost);
		let remainingPkgs = packageGroup.packages
		let toBeSentPkgs = []
		for (let idx = 0; idx < packageGroup.packages.length; idx++) {
			if (remainingPkgs.length != 0) {
				deliveryData = newVehicle.deliveryOfPackage(remainingPkgs)
				// console.log(deliveryData)
				remainingPkgs = deliveryData.pkgsLeft || []
				toBeSentPkgs.push(deliveryData.packagesSent)
			}
			else {
				break;
			}
		}
		let valString = ''
		const packagesCostAndTime = newVehicle.getDeliveryTime(toBeSentPkgs)
		packagesCostAndTime.forEach(item => {
			console.log(`${item.packageId} ${item.discount} ${item.totalCost} ${item.estTime.toFixed(2)}`)
		})
	});

program.parse();

// node ./src/cli.js cost -p 100 -n 3 -ps  "pkg1 50 5 offer1, pkg1 50 5 offer1, pkg1 sdf 100 offer2"

// -p 100 -n 3 -ps "PKG1 5 5 OFR001, PKG2 15 5 OFR002, PKG3 10 100 OFR003"
