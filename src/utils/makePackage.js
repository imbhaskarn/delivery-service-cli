class MakePackage{
    static package(packages){
            let packageList = [];
            packages.forEach((item) => {
                packageList.push({
                    packageId: item[0],
                    pkgWeight: parseInt(item[1])|| 1,
                    distanceInKms: parseInt(item[2]) || 1,
                    offerCode: item[3].toUpperCase() || '',
                });
                id++
            });
            return packageList
        }
}

module.exports = MakePackage
