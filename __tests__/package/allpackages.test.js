const { AllPackages } = require('../../src/package/allPackages')
const mockData = require('../mockdata.json')


describe('Test AllPackages class', () => {
	test('Test Get method on AllPackages', () => {
		const flags = mockData.flags
		const allPackages = AllPackages.get(
			flags,
			'cost')
		const packages = allPackages.packages
		expect(packages).toEqual({
			baseCost: 100,
			listOfPackages: [
				{
					distanceInKms: 5,
					offerCode: 'OFR001',
					packageId: 'PKG1',
					pkgWeight: 5,
				},
				{
					distanceInKms: 5,
					offerCode: 'OFR002',
					packageId: 'PKG2',
					pkgWeight: 15,
				},
				{
					distanceInKms: 100,
					offerCode: 'OFR003',
					packageId: 'PKG3',
					pkgWeight: 10,
				},
			],
			units: 3,
		})
		expect(packages.error).toBeFalsy
	})
	test('Test Get Method for wrong arguments', () => {
		const flags = mockData.flags
		const allPackages = AllPackages.get(
			flags,
			'cost',
			['xyz'])
		expect(allPackages.packages).toEqual([])
		expect(allPackages.errors).toEqual(['Invalid arguments passed: xyz'])
		expect(allPackages.error).toBeTruthy
	})
})
