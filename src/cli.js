const { Command } = require('commander');
const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('cost')
  .description('Calculates cost for packages')
  .option('-s, --packages <char...>')
  .action((str, options) => {
    console.log(options)
    console.log(str)
  });

program.parse();