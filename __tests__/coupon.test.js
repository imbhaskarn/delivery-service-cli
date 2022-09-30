const {Coupon} = require('../src/coupon/coupon')


describe('Test Coupon class', () => {
	test('test coupoun class', () => {
		expect( Coupon.CalculateDiscount({
			packageId: 'PKG3',
			pkgWeight: 10,
			distanceInKms: 100,
			offerCode: 'OFR003'
		} , 700) ).toBe(35)
	})
    
})
