const offerList = require("./offers.json");

class Discount {
	static getDiscount(totalCost, pkg) {
		const coupon = offerList[pkg.offerCode];
		let isValid = false;
		if (
			coupon !== void 0 &&
			pkg.pkgWeight >= coupon.minWeight &&
			pkg.pkgWeight <= coupon.maxWeight &&
			pkg.distanceInKms >= coupon.minDist &&
			pkg.distanceInKms <= coupon.maxDist
		) {
			isValid = true;
		}
		return {
			discount: isValid ? (totalCost / 100) * coupon.prct : 0,
		};
	}
}

module.exports = Discount;
