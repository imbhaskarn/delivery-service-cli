const { exec } = require("child_process");
const { DeliveryCost, PerPackageCost } = require("../src/deliveryCost/costAndDiscount");
const { MakePackage } = require("../src/package/packageObject");
const mockData = require('./mockdata.json')

describe('test MakePackage response type', () => {
    test('makePackage.package', () => {
        expect(typeof MakePackage.package(mockData.packageString)).toEqual('object')
    });
});


describe('Test Make Package Class', () => {
    test('Test Make Package Class', () => {
        expect(MakePackage.package(mockData.packageString)).toEqual([
            {
                packageId: 'PKG1',
                pkgWeight: 50,
                distanceInKms: 30,
                offerCode: 'OFR001'
            }
        ])
    });
});

describe('test PerPackageCost', () => {
    test('Test Cost Per package', () => {
        expect(PerPackageCost.getCost(mockData.pkg, 100)).toEqual({
            actualPackageCost: 665,
            discount: 35
        })
    });
});


describe('test make package function', () => {
    test('Test DeliveryCost Class and Methods', () => {
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
        expect(deliveryCost.calculate()).toEqual([{"discount": 0, "packageId": "PKG1", "totalCost": 750}])
    });
});

// test challenge one and challenge two

describe('test cli commands', () => {
    test('Test cost command', () => {
        exec(mockData.costCliCommand, (error, stdout) => {
            expect(error).toBe(null)
            expect(stdout).toEqual("PKG1 0 175\nPKG2 0 275\nPKG3 35 665\n")
        })
    });
    // test('test time command', () => {
    //     exec(mockData.timeCommand, (error, stdout) => {
    //         expect(error).toBe(null)
    //         expect(stdout).toEqual("PKG1 0 175 0.07\nPKG2 0 275 0.07\nPKG3 35 665 1.43\n")
    //     })
    // });
});
