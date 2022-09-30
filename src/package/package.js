const { MakePackage } = require('./packageObject')

class Package {
	constructor(baseCost, units, stringPackageList, type, vehicleInfoString) {
		this.baseCost = parseInt(baseCost), this.units = parseInt(units)
		this.stringPackageList = `${stringPackageList}`
		this.type = type || ''
		this.vehicleInfoString = vehicleInfoString || ''
	}

	parsePackage() {
		const pkgArr = this.stringPackageList.split(',')
		let rawPackageList = []
		pkgArr.forEach((item) => {
			rawPackageList.push(item.trim().split(' '))
		})
		return rawPackageList
	}
	groupAllPackages(rawPackageList) {
		return {
			baseCost: this.baseCost,
			units: this.units,
			listOfPackages: MakePackage.package(rawPackageList),
		}
	}
	validatePackage(rawPackageList) {
		let errors = []
		if (isNaN(this.baseCost)) {
			errors.push({ baseCost: 'base cost is not a number' })
		}
		if (isNaN(this.units)) {
			errors.push({ units: 'unit is not a valid unit' })
		}
		rawPackageList.forEach((item) => {
			if (item[3] === 'undefined') {
				errors.push({
					packageWeight: 'package Weight is not a number',
				})
			}
			if (isNaN(item[1])) {
				errors.push({
					packageWeight: 'package Weight is not a number',
				})
			}
			if (isNaN(item[2])) {
				errors.push({
					distanseInKms: ' distance in km is not a number',
				})
			}
		}
		)
		if (this.type === 'time') {
			if (this.vehicleInfoString.length !== 3) {
				errors.push({
					vehicleInfo: 'vehicle info is invalid format',
				})
			}
			if (isNaN(this.vehicleInfoString[0])) {
				errors.push({
					vehicleInfo: 'No. of vehicles is not a number',
				})
			}
			if (isNaN(this.vehicleInfoString[1])) {
				errors.push({
					vehicleInfo: 'Max vehicle speed is not a number',
				})
			}
			if (isNaN(this.vehicleInfoString[2])) {
				errors.push({
					vehicleInfo: 'vehicle load capacity is not a number',
				})
			}
		}
		return {
			error: errors.length > 0 ? true : false,
			errors: errors,
		}
	}
}

module.exports = { Package }
