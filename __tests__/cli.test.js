const { exec } = require("child_process");
const MakePackage = require("../src/utils/makePackage");
const mockData = require('./mockdata.json')
const D = require('../src/utils/getCouponDiscount')

describe('test MakePackage response type', () => {
    test('makePackage.package', () => {
        expect(typeof MakePackage.package(mockData.packageString)).toEqual('object')
    });
});


describe('test make package function', () => {
    test('makePackage', () => {
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

describe('test make package function', () => {
    test('makePackage.package', () => {
        expect(D.getDiscount(700, mockData.pkg)).toEqual({ discount: 35 })
    });
});

describe('test cli commands', () => {
    test('test cost command', () => {
        exec(mockData.costCliCommand, (error, stdout, stderr) => {
            expect(error).toBe(null)
            expect(stdout).toEqual("PKG1 0 175\nPKG2 0 275\nPKG3 35 665\n")
        })
    });
    test('test time command', () => {
        exec(mockData.timeCommand, (error, stdout, stderr) => {
            expect(error).toBe(null)
            expect(stdout).toEqual("PKG1 0 175 0.07\nPKG2 0 275 0.07\nPKG3 35 665 1.43\n")
        })
    });
});
