const { Command } = require('commander');
const program = new Command();
const Package = require('./utils/package')

program
  .name('delivery-cli')
  .description('Cli package for delivery services')
  .version('0.8.0');

program.command('cost')
  .description('Calculates cost for packages')
  .requiredOption('-p, --price <char>, base delivery cost of a package')
  .requiredOption('-n, --items <number>, No. of package for cost calculation')
  .option('-ps, --packages <packages...>', "Format: [pkgid, pkgweight, distance-from-hub, offer-code]")
  .action((str, options) => {
    const packageString = new Package(str.price, str.items, str.packages)
    const allPackages = packageString.getPackage()
    console.log(allPackages)
    const validationResult = packageString.validatePackage(allPackages)
    console.log(validationResult)
  });


  program.command('time')
  .description('Calculates delivery time for packages')
  .requiredOption('-p, --price <char...>, base delivery cost of a package')
  .requiredOption('-n, --items <char...>', 'No. of package for delivery calculation')
  .option('-ps, --packages <char...>,', 'Format: [pkgid, pkgweight, distance-from-hub, offer-code]')
  .action((str, options) => {
    console.log(str)
  });

program.parse();