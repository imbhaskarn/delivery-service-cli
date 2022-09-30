const { SetDelivery } = require('../src/setDelivery/setDelivery')

describe('Test SetDelivery class', () => {
	test('set delivery', () => {
		const allpackages = {
			baseCost: 100,
			units: 3,
			listOfPackages: [
				{
					packageId: 'PKG2',
					pkgWeight: 150,
					distanceInKms: 5,
					offerCode: 'OFR002'
				}
			]
		}
		const deliveryCostAndTime = SetDelivery.receipt(allpackages, [1,70,200])
		expect(deliveryCostAndTime).toEqual([
			{
				packageId: 'PKG2',
				discount: 0,
				totalCost: 1625,
				estTime: 0.07142857142857142
			}
		])
	})
    
})





