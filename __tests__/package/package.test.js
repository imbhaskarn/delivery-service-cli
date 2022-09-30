const { Package } = require('../../src/package/package')
const mockData = require('../mockdata.json')
describe('Test package class', () => {
	test('Initialize package class check all results', () => {
		const flags = mockData.flags
		const rawPackage = new Package(
			flags.price,
			flags.items,
			flags.packages,
			'cost'
		)
		expect(rawPackage).toEqual({
			'baseCost': 100,
			'units': 3,
			'stringPackageList': 'PKG1 5 5 OFR001, PKG2 15 5 OFR002, PKG3 10 100 OFR003',
			'type': 'cost',
			'vehicleInfoString': ''
		})
		const rawPackageList = rawPackage.parsePackage()
		expect(rawPackageList).toEqual([
			['PKG1', '5', '5', 'OFR001'], ['PKG2', '15', '5', 'OFR002'], ['PKG3', '10', '100', 'OFR003']
		])
		const validationResult = rawPackage.validatePackage(rawPackageList)
		expect(validationResult.error).toBeFalsy
		const packages = rawPackage.groupAllPackages(rawPackageList)
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
	})
})