const offerList = require('./offers.json')

class Coupon {
	static CalculateDiscount(pkg, totalCost) {
		const coupon = offerList[pkg.offerCode]
		if (
			coupon !== void 0 &&
			pkg.pkgWeight >= coupon.minWeight &&
			pkg.pkgWeight <= coupon.maxWeight &&
			pkg.distanceInKms >= coupon.minDist &&
			pkg.distanceInKms <= coupon.maxDist
		) {
			return (totalCost / 100) * coupon.prct
		}
		return 0
	}
}


module.exports = {Coupon}
