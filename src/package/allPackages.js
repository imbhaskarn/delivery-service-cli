const { Package } = require("./package");

class AllPackages {
    static get(flags, type, options){
        console.log(options.args)
        if (options.args.length > 0) {
			console.log(`Invalid arguments passed: ${options.args.toString()}`);
			return;
		}
        const rawPackage = new Package(
			flags.price,
			flags.items,
			flags.packages,
			type
		);
		const rawPackageList = rawPackage.parsePackage();

		const validationResult = rawPackage.validatePackage(rawPackageList);
		if (validationResult.error) {
		 	return {
                error: true,
                errors: validationResult.errors
            }
		}
            return {packages: rawPackage.groupAllPackages(rawPackageList), error: false}
		
    }
}

module.exports = {
    AllPackages
}