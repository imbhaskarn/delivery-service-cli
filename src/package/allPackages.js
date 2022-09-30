const { Package } = require('./package')

class AllPackages {
	static get(flags, type, args) {
		if ( args != void 0 && args.length > 0) {
			console.log(`Invalid arguments passed: ${args.toString()}`)
			return { packages: [], error: true, errors: [`Invalid arguments passed: ${args.toString()}`] }
		}
		const rawPackage = new Package(
			flags.price,
			flags.items,
			flags.packages,
			type
		)
		const rawPackageList = rawPackage.parsePackage()
		const validationResult = rawPackage.validatePackage(rawPackageList)
		if (validationResult.error) {
			return {
				error: true,
				errors: validationResult.errors
			}
		}
		return { packages: rawPackage.groupAllPackages(rawPackageList), error: false }

	}
}

module.exports = {
	AllPackages
}