const fs = require('fs');
const path = require('path');
const program = require('commander');
const semver = require('semver');
const chalk = require('chalk');

const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;

const packagePath = path.join(process.cwd(), 'package.json');
const package = require(packagePath);

module.exports = (to, opt) => {
  let version = null;

  switch (to) {
    case 'github':
      break;
    default:
      version = semver.inc(package.version, to)
  }

  package.version = version;

  fs.writeFile(
    packagePath,
    JSON.stringify(package, null, 2),
    'utf8',
    (err) => {
      if (err) {
        new Error(error);
      } else {
        console.log(`${chalk.blue.bold('package.json updated to:')} ${version}`)
      }
    }
  );
};
