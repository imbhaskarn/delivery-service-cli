const { MakePackage } = require('../../src/package/packageObject')

describe('Test MakePackage class', () => {
	test('MakePackage class', () => {
		expect(MakePackage.package([[
			'PKG3',
			'10',
			'100',
			'OFR003'
		]])).toEqual([{
			packageId: 'PKG3',
			pkgWeight: 10,
			distanceInKms: 100,
			offerCode: 'OFR003'
		}])
	})
    
})
