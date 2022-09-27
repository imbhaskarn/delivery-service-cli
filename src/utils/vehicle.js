const D = require("./getCouponDiscount");

class LoadAndTime {
    static trip(pkgGrp, target) {
        let first = 0;
        let second = 0;
        let count = 0;
        let pkgsLeft = [];
        let indexes = [];
        let packagesSent = {};
        for (let idx = 0; idx < pkgGrp.length; idx++) {
            for (let jdx = 0; jdx < pkgGrp.length; jdx++) {
                if (
                    pkgGrp[idx].pkgWeight + pkgGrp[jdx].pkgWeight > count &&
                    pkgGrp[idx].pkgWeight + pkgGrp[jdx].pkgWeight < target
                ) {
                    count = pkgGrp[idx].pkgWeight + pkgGrp[jdx].pkgWeight;
                    first = idx;
                    second = jdx;
                }
            }
        }
        if (first == second) {
            let maxWeight = 0;
            let maxWeightIndex = 0;
            // for (let idx = 0; idx < pkgGrp.length; idx++) {
            //     if(pkgGrps[idx].pkgWeight <= target){
            //         packages.push(pkgGrp[idx].pkgWeight)
            //     }
            // }
            for (let kdx = 0; kdx < pkgGrp.length; kdx++) {
                const el = pkgGrp[kdx].pkgWeight;
                if (el > maxWeight) {
                    maxWeight = el;
                    maxWeightIndex = kdx;
                }
            }
            indexes.push(maxWeightIndex);
            for (let k = 0; k < pkgGrp.length; k++) {
                if (indexes.includes(k) !== true) {
                    pkgsLeft.push(pkgGrp[k]);
                }
            }
            return {
                packagesSent: [pkgGrp[maxWeightIndex]],
                pkgsLeft: pkgsLeft,
            };
        } else {
            indexes.push(first, second);
            for (let k = 0; k < pkgGrp.length; k++) {
                if (indexes.includes(k) !== true) {
                    pkgsLeft.push(pkgGrp[k]);
                }
            }
            return {
                packagesSent: [pkgGrp[first], pkgGrp[second]],
                pkgsLeft: pkgsLeft,
            };
        }
    }
}

class Vehicle {
    constructor(vehicle, baseCost) {
        this.baseCost = parseInt(baseCost)
        this.nOfvVehicles = parseInt(vehicle[0])
        this.maxSpeed = vehicle[1]
        this.maxCapacity = vehicle[2]
    }
    deliveryOfPackage(packages) {
        let tripData = {};
        const maxLoadSum = packages.reduce((accumulator, object) => {
            return accumulator + object.pkgWeight;
        }, 0);
        if (maxLoadSum <= this.maxCapacity) {
            let num = 0;
            tripData.packagesSent = [];
            packages.forEach((item) => {
                tripData.packagesSent.push(packages[num]);
                num++;
            });
            tripData.indexes = [0, packages.length - 1];
        } else {
            tripData = LoadAndTime.trip(packages, this.maxCapacity);
        }
        return tripData;
    }
    getDeliveryTime(packageTrips) {
        let vehicles = [];
        let result = [];
        packageTrips.forEach((pkgInWay) => {
            let discount = 0;
            let timeTaken = 0;
            let distArr = [];
            if (vehicles.length < this.nOfvVehicles) {
                pkgInWay.forEach((item) => {
                    distArr.push(item.distanceInKms);
                });
                timeTaken =((Math.max(...distArr) / this.maxSpeed) * 2)
                pkgInWay.forEach((item) => {
                    let totalCost = parseInt(
                        this.baseCost +
                        parseInt(item.pkgWeight) * 10+
                        parseInt(item.distanceInKms) * 5
                    )
                    discount = D.getDiscount(totalCost, item);
                    let TimeCostPerPackage = {
                        packageId: item.packageId,
                        discount: discount.discount,
                        totalCost: totalCost - discount.discount,
                        estTime: (item.distanceInKms / this.maxSpeed),
                    };
                    result.push(TimeCostPerPackage);
                    vehicles.push(timeTaken);
                });
            } else {
                pkgInWay.forEach((item) => {
                    distArr.push(item.distanceInKms);
                });
                let estTime = 0
                let leastVehicleTime = Math.min(...vehicles);
                let vehicleIndex = vehicles.indexOf(leastVehicleTime);
                
                pkgInWay.forEach((item) => {
                   estTime = (leastVehicleTime + (item.distanceInKms / this.maxSpeed) *2)
                   let totalCost = parseInt(
                    (this.baseCost) +
                    parseInt(item.pkgWeight) * 10 +
                    parseInt(item.distanceInKms) * 5
                )
                discount = D.getDiscount(totalCost, item);
                    let TimeCostPerPackage = {
                        packageId: item.packageId,
                        discount: discount.discount,
                        totalCost: totalCost - discount.discount,
                        estTime: leastVehicleTime + (item.distanceInKms / this.maxSpeed),
                    };

                    vehicles[vehicleIndex] = estTime;
                    result.push(TimeCostPerPackage);
                });
            }
        });
        return result;
    }
}

module.exports = Vehicle

