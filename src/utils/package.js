const MakePackage = require("./makePackage");

class Package {
	constructor(baseCost, units, packages, type, vehicle) {
		(this.baseCost = baseCost), (this.units = units);
		this.packages = `${packages}`;
        this.type = type || ''
        this.vehicle = vehicle || ""
	}

	validatePackage(packages) {
		let errors = [];
		if (isNaN(this.baseCost)) {
			errors.push({ baseCost: `base cost is not a number` });
		}
		if (isNaN(this.units)) {
			errors.push({ units: "unit is not a valid unit" });
		}
		packages.forEach((item) => {
            if(item[3] === 'undefined'){
                errors.push({
					packageWeight: `package Weight is not a number`,
				});
            }
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
		}
        );
        if(this.type === 'time'){
           if(this.vehicle.length !== 3){
            errors.push({
                vehicleInfo: `vehicle info is invalid format`,
            });
           }
           if(isNaN(this.vehicle[0])){
            errors.push({
                vehicleInfo: `No. of vehicles is not a number`,
            });
           }
           if(isNaN(this.vehicle[1])){
            errors.push({
                vehicleInfo: `Max vehicle speed is not a number`,
            });
           }
           if(isNaN(this.vehicle[2])){
            errors.push({
                vehicleInfo: `vehicle load capacity is not a number`,
            });
           }
        }
		return {
			error: errors.length > 0 ? true : false,
			errors: errors,
		};
	}
	parsePackage() {
		const pkgArr = this.packages.split(",");
		let packages = [];
		pkgArr.forEach((item) => {
			packages.push(item.trim().split(" "));
		});
		return packages;
	}
	packageGroup(allPackages) {
		return {
			baseCost: this.baseCost,
			units: this.units,
			packages: MakePackage.package(allPackages),
		};
	}
}

module.exports = Package;
