const {Coupon} = require("../coupon/coupon");

class PerPackageCost {
	static getCost(pkg, baseCost){
		const actualPackageCost = parseInt(baseCost + (pkg.pkgWeight*10) + (pkg.distanceInKms*5))
		const discount =  Coupon.CalculateDiscount(pkg, actualPackageCost)
		return {
			actualPackageCost: actualPackageCost - discount,
			discount: discount
		}
	}
}

class DeliveryCost {
	constructor(packageGroup) {
		this.baseCost = parseInt(packageGroup.baseCost)
        this.packageGroup = packageGroup.listOfPackages
	}
	calculate() {
		let allPkgsWithCost = [];
		this.packageGroup.forEach((item) => {
			const packageCost = PerPackageCost.getCost(item, this.baseCost)
			allPkgsWithCost.push({
				packageId: item.packageId,
				discount: packageCost.discount,
                totalCost: packageCost.actualPackageCost
			});
		});
        return allPkgsWithCost
	}
}


module.exports = {
	DeliveryCost, PerPackageCost
}

