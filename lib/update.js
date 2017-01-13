const { compose, find, forEach, pluck, contains, when, isNil, toLower } = require('ramda');
const fs = require('fs');
const path = require('path');
const program = require('commander');
const semver = require('semver');
const chalk = require('chalk');
const GitHubApi = require("github");

const packagePath = path.join(process.cwd(), 'package.json');
const packageJSON = require(packagePath);

const versionFromLabels = compose(
  when(isNil, () => 'minor'),
  find(name => contains(name, ['major', 'minor', 'patch'])),
  forEach(toLower),
  pluck('name')
);

const versionFromGithub = ({ github, token, owner, repo, number }) => new Promise((resolve, reject) => {
  github.authenticate({
    type: "oauth",
    token
  });

  github
    .issues
    .getIssueLabels(
      { owner, repo, number },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(versionFromLabels(res))
        }
      }
    )
});

const nextVersion = ({ from, to, opt }) => new Promise((resolve, reject) => {
  switch (to) {
    case 'github':
      versionFromGithub({
        github: opt.github,
        token: opt.token,
        owner: opt.owner,
        repo: opt.repo,
        number: opt.number
      })
        .then((githubTo) => resolve(semver.inc(from, githubTo)))
    break;
    default:
      resolve(semver.inc(from, to))
  }
});

const updateCommand = (to, opt) => {
  nextVersion({
    from: packageJSON.version,
    to,
    opt: {
      token: opt.access_token,
      owner: opt.owner,
      branch: opt.branch,
      repo: opt.repo,
      number: opt.number,
      github: GitHubApi()
    }
  })
    .then((version) => {
      packageJSON.version = version;

      fs.writeFile(
        packagePath,
        JSON.stringify(packageJSON, null, 2),
        'utf8',
        (err) => {
          if (err) {
            new Error(error);
          } else {
            console.log(version);
          }
        }
      );
    })

};

module.exports.updateCommand = updateCommand;

module.exports.nextVersion = nextVersion;

module.exports.versionFromGithub = versionFromGithub;
