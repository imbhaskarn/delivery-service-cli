class MakePackage{
    static package(packages){
            let packageList = [];
            let id = 1
            packages.forEach((item) => {
                packageList.push({
                    id : id,
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
