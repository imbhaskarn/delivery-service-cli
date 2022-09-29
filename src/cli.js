const { Command } = require("commander");
const program = new Command();
const {DeliveryCost} = require("./deliveryCost/costAndDiscount");
const { AllPackages } = require("./package/allPackages");
const { SetDelivery } = require("./setDelivery/setDelivery");
const Vehicle = require("./vehicle/vehicle");
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
		const allPackages = AllPackages.get(str, 'cost', options)
		if(allPackages.error){
			console.log(allPackages.errors)
			return;
		}
		const deliveryCost = new DeliveryCost(allPackages.packages);
		const allPackagesWithCostAndDiscount = deliveryCost.calculate();
		allPackagesWithCostAndDiscount.forEach(item => {
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
		const allPackages = AllPackages.get(str, 'cost', options)
		if(allPackages.error){
			console.log(allPackages.errors)
			return;
		}
		const packagesCostAndTime = SetDelivery.receipt(allPackages.packages, str.vehicle)
		packagesCostAndTime.forEach(item => {
			console.log(`${item.packageId} ${item.discount} ${item.totalCost} ${item.estTime.toFixed(2)}`)
		})
	});

program.parse();
