const D = require("./getCouponDiscount");
class DeliveryCost {
	constructor(packageGroup) {
		this.baseCost = parseInt(packageGroup.baseCost)
        this.packageGroup = packageGroup.packages
	}
	calculate() {
		let allCosts = [];
		this.packageGroup.forEach((item) => {
            const totalCost = parseInt(this.baseCost + (item.pkgWeight*10) + (item.distanceInKms*5))
            const discount =  D.getDiscount(totalCost, item).discount
			allCosts.push({
				packageId: item.packageId,
				discount: discount,
                totalCost: totalCost - discount
			});
		});
        return allCosts
	}
}

module.exports = DeliveryCost