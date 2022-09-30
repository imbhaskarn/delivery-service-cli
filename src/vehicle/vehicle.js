const { PerPackageCost } = require('../deliveryCost/deliveryCost')

class MaxLoad {
	static trip(pkgGrp, target) {
		let pacakgesInATrip = []
		let count = 0
		let pkgsLeft = []
		let indexes = []
		for (let i = 0; i < pkgGrp.length; i++) {
			for (let j = 0; j < pkgGrp.length; j++) {
				if (
					pkgGrp[i].pkgWeight + pkgGrp[j].pkgWeight > count &&
                    pkgGrp[i].pkgWeight + pkgGrp[j].pkgWeight < target
				) {
					count = pkgGrp[i].pkgWeight + pkgGrp[j].pkgWeight
					pacakgesInATrip.push(...[i, j])
				}
			}
		}

		if (pacakgesInATrip[0] == pacakgesInATrip[1]) {
			let maxWeight = 0
			let maxWeightIndex = 0
			for (let i = 0; i < pkgGrp.length; i++) {
				const el = pkgGrp[i].pkgWeight
				if (el > maxWeight) {
					maxWeight = el
					maxWeightIndex = i
				}
			}
			indexes.push(maxWeightIndex)
			for (let k = 0; k < pkgGrp.length; k++) {
				if (indexes.includes(k) !== true) {
					pkgsLeft.push(pkgGrp[k])
				}
			}
			return {
				packagesSent: [pkgGrp[maxWeightIndex]],
				pkgsLeft: pkgsLeft,
			}
		} else {
			indexes.push(...pacakgesInATrip)
			for (let k = 0; k < pkgGrp.length; k++) {
				if (indexes.includes(k) !== true) {
					pkgsLeft.push(pkgGrp[k])
				}
			}
			return {
				packagesSent: [pkgGrp[pacakgesInATrip[0]], pkgGrp[pacakgesInATrip[1]]],
				pkgsLeft: pkgsLeft,
			}
		}
	}
}

class Vehicle {
	constructor(vehicle, baseCost) {
		this.baseCost = parseInt(baseCost)
		this.nOfvVehicles = parseInt(vehicle[0])
		this.maxSpeed = parseInt(vehicle[1])
		this.maxCapacity = parseInt(vehicle[2])
	}
	deliveryOfPackage(packages) {
		let tripData = {}
		let maxLoadSum = 0
		packages.forEach(pkg =>{
			maxLoadSum = maxLoadSum + pkg.pkgWeight
		})
		if (maxLoadSum <= this.maxCapacity) {
			tripData.packagesSent = []
			tripData.pkgsLeft = []
			for (let i = 0; i < packages.length; i++) {
				tripData.packagesSent.push(packages[i])
			}
		} else {
			tripData = MaxLoad.trip(packages, this.maxCapacity)
		}
		return tripData
	}
	getDeliveryTime(packageTrips) {
		let vehicles = []
		let result = []
		packageTrips.forEach((pkgInWay) => {
			let timeTakenOnTrip = 0
			let allDistances = []
			if (vehicles.length < this.nOfvVehicles) {
				pkgInWay.forEach((item) => {
					allDistances.push(item.distanceInKms)
				})
				timeTakenOnTrip = ((Math.max(...allDistances) / this.maxSpeed) * 2)
				pkgInWay.forEach((item) => {
					const packageCost = PerPackageCost.getCost(item, this.baseCost)
					let TimeCostPerPackage = {
						packageId: item.packageId,
						discount: packageCost.discount,
						totalCost:packageCost.actualPackageCost,
						estTime: (item.distanceInKms / this.maxSpeed),
					}
					result.push(TimeCostPerPackage)
				})
				vehicles.push(timeTakenOnTrip)
			} else {
				pkgInWay.forEach((item) => {
					allDistances.push(item.distanceInKms)
				})
				let estTime = 0
				let leastVehicleTime = Math.min(...vehicles)
				let vehicleIndex = vehicles.indexOf(leastVehicleTime)

				pkgInWay.forEach((item) => {
					estTime = (leastVehicleTime + (item.distanceInKms / this.maxSpeed) * 2)
					const packageCost = PerPackageCost.getCost(item, this.baseCost)
					let TimeCostPerPackage = {
						packageId: item.packageId,
						discount: packageCost.discount,
						totalCost:packageCost.actualPackageCost,
						estTime: leastVehicleTime + (item.distanceInKms / this.maxSpeed),
					}
					vehicles[vehicleIndex] = estTime
					result.push(TimeCostPerPackage)
				})
			}
		})
		return result
	}
}

module.exports = {Vehicle, MaxLoad}

