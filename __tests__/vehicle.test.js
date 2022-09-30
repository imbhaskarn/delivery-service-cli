const {Vehicle, MaxLoad } = require('../src/vehicle/vehicle')

describe('MaxLoadAndTime', () => {
	test('Test LoadAndTime class', () => {
		const tripData = MaxLoad.trip([{
			packageId: 'PKG1',
			pkgWeight: 80,
			distanceInKms: 5,
			offerCode: 'OFR001'
		},
		{
			packageId: 'PKG2',
			pkgWeight: 75,
			distanceInKms: 5,
			offerCode: 'OFR002'
		}], 90)
		console.log(tripData)
		expect(tripData.packagesSent).toEqual([
			{
				packageId: 'PKG1',
				pkgWeight: 80,
				distanceInKms: 5,
				offerCode: 'OFR001'
			}
		])
		expect(tripData.pkgsLeft).toEqual([
			{
				packageId: 'PKG2',
				pkgWeight: 75,
				distanceInKms: 5,
				offerCode: 'OFR002'
			}
		])
	})
    
})




describe('Test vehicle class', () => {
	test('vehicle class', () => {

		const vehicle = new Vehicle([1,70,200], 100)
		expect(vehicle).toEqual({
			baseCost: 100,
			nOfvVehicles: 1,
			maxSpeed: 70,
			maxCapacity: 200
		})
		let remainingPkgs = [
			{
				packageId: 'PKG1',
				pkgWeight: 75,
				distanceInKms: 5,
				offerCode: 'OFR001'
			},
			{
				packageId: 'PKG2',
				pkgWeight: 150,
				distanceInKms: 5,
				offerCode: 'OFR002'
			}
		]

		const deliveryData = vehicle.deliveryOfPackage(remainingPkgs)
		expect(deliveryData.packagesSent).toEqual([
			{
				packageId: 'PKG2',
				pkgWeight: 150,
				distanceInKms: 5,
				offerCode: 'OFR002'
			}
		])
		expect(deliveryData.pkgsLeft).toEqual([
			{
				packageId: 'PKG1',
				pkgWeight: 75,
				distanceInKms: 5,
				offerCode: 'OFR001'
			}
		])
		const deliveryTime = vehicle.getDeliveryTime([remainingPkgs])
		expect(deliveryTime).toEqual([
			{
				packageId: 'PKG1',
				discount: 87.5,
				totalCost: 787.5,
				estTime: 0.07142857142857142
			},
			{
				packageId: 'PKG2',
				discount: 0,
				totalCost: 1625,
				estTime: 0.07142857142857142
			}
		])
	})
    
})

