const { DeliveryCost, PerPackageCost } = require('../src/deliveryCost/costAndDiscount')
const mockData = require('./mockdata.json')

describe('test make package function', () => {
	test('test delivery cost class', () => {
		const deliveryCost = new DeliveryCost(mockData.allPackagesGroup)
		expect(deliveryCost).toEqual({
			baseCost: 100,
			packageGroup: [
				{
					packageId: 'PKG1',
					pkgWeight: 50,
					distanceInKms: 30,
					offerCode: 'OFR001'
				}
			]
		})
		expect(deliveryCost.calculate()).toEqual([{ 'discount': 0, 'packageId': 'PKG1', 'totalCost': 750 }])
	})
})

describe('test PerPackageCost', () => {
	test('Test Cost Per package', () => {
		expect(PerPackageCost.getCost(mockData.pkg, 100)).toEqual({
			actualPackageCost: 665,
			discount: 35
		})
	})
})