class Package {
	constructor(baseCost, units, packages) {
		(this.baseCost = baseCost), (this.units = units);
		this.packages = `${packages}`;
	}

	getPackage() {
		const pkgArr = this.packages.split(",");
		let packages = [];
		pkgArr.forEach((item) => {
			packages.push(item.trim().split(" "));
		});
		return packages;
	}

	validatePackage(packages) {
		let errors = [];
		if (isNaN(this.baseCost)) {
			errors.push({ baseCost: `base cost is not a number` });
		}
		packages.forEach((item) => {
			if (isNaN(item[1])) {
				errors.push({
					packageWeight: `package Weight is not a number`,
				});
			}
			if (isNaN(item[2])) {
				errors.push({
					distanseInKms: ` distance in km is not a number`,
				});
			}
		});
		return {
			error: errors.length < 0 ? true : false,
			errors: errors,
		};
	}
    
	ListPackages() {
		return {
			baseCost: this.baseCost,
			units: 3,
			packages: (function () {
				let packageList = [];
				this.packages.forEach((item) => {
					packageList.push({
						packageId: item[0],
						pkgWeight: item[1],
						distanceInKms: item[2],
						offerCode: item[3],
					});
				});
			})(),
		};
	}
}

module.exports = Package;
