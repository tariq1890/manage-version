# Manage Version
[![Master
Status](https://circleci.com/gh/procore/manage-version.png?circle-token=)](https://circleci.com/gh/procore/manage-version/tree/master)
A node command line tool for managing the version of a package.json using node semver package. Configure
update to get next version from github.

## Command 
#### Help
```bash
manage-version --help
```
### Update
```bash
update [options] <to>

update version of package.json

Options:
-h, --help   output usage information
-b, --branch <branch> source branch for evaluating next version
```
