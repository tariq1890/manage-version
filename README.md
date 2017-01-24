# Manage Version

[![Master
Status](https://circleci.com/gh/procore/manage-version.png?circle-token=99c10f0c2b5fb6ad3c0b96974469ad1b12d95c25)](https://circleci.com/gh/procore/manage-version/tree/master)

A node command line tool for managing the version of a package.json.

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
-b, --branch [branch] source branch for evaluating next version
-t, --token [access token] access token used for github
-o --owner [owner] owner of github repo
-r, --repo [repo] github repo
```

#### Examples
```bash
manage-version update minor
```
```bash
manage-version update github -o procore -r manage-version -t $GITHUB_TOKEN 
```
