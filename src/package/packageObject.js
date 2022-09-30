class MakePackage{
	static package(rawPackageList){
		let packageList = []
		rawPackageList.forEach((rawPackage) => {
			packageList.push({
				packageId: rawPackage[0],
				pkgWeight: parseInt(rawPackage[1])|| 1,
				distanceInKms: parseInt(rawPackage[2]) || 1,
				offerCode: rawPackage[3].toUpperCase() || '',
			})
		})
		return packageList
	}
}

module.exports = {MakePackage}
