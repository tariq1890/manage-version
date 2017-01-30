# Manage Version

[![Master
Status](https://circleci.com/gh/procore/manage-version.png?circle-token=99c10f0c2b5fb6ad3c0b96974469ad1b12d95c25)](https://circleci.com/gh/procore/manage-version/tree/master)

A node command line tool for managing the version of a package.json.

## Installation
```
npm install -g manage-version
```

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

## Tests
```
npm run test
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/procore/manage-version. This project is
intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## About Procore

<img
  src="https://www.procore.com/images/procore_logo.png"
  alt="Procore Logo"
  width="250px"
/>

Manage Version is maintained by Procore Technologies.

Procore - building the software that builds the world.

Learn more about the #1 most widely used construction management software at [procore.com](https://www.procore.com/)
