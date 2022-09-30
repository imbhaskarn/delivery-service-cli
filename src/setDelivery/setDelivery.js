const {Vehicle }= require('../vehicle/vehicle')
class SetDelivery {
	static receipt(allpackages, vehicleInfo) {
		const packages = allpackages
		const vehicle = new Vehicle(vehicleInfo, packages.baseCost)
		let remainingPkgs = packages.listOfPackages
		let toBeSentPkgs = []
		for (let i = 0; i < packages.listOfPackages.length; i++) {
			if (remainingPkgs.length != 0) {
				const deliveryData = vehicle.deliveryOfPackage(remainingPkgs)
				remainingPkgs = deliveryData.pkgsLeft || []
				toBeSentPkgs.push(deliveryData.packagesSent)
			}
			else {
				break
			}
		}
		return vehicle.getDeliveryTime(toBeSentPkgs)
	}
}

module.exports = {
	SetDelivery
}