#! /usr/bin/env node --harmony

const program = require('commander');
const update = require('./update.js');

program
  .version('0.0.1')
  .description('Node command line tool for managing package.json version')

program
  .command('update <to>')
  .description('update version of package.json')
  .option('-b, --branch <branch>', 'source branch for evaluating next version', 'develop')
  .action(update);

program.parse(process.argv);
