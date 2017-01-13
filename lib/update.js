const { compose, find, filter, forEach, pluck, contains, when, isNil, toLower,  not, prop, nth } = require('ramda');
const fs = require('fs');
const Promise = require('bluebird');
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

const lastMergedPullRequestNumber = compose(
  prop('number'),
  nth(0),
  filter(
    compose(
      not,
      isNil,
      prop('merged_at')
    )
  )
)

const versionFromGithub = ({ github, token, owner, repo, number }) => {
  github.authenticate({
    type: "oauth",
    token
  });

  const getAllPullRequests = Promise.promisify(github.pullRequests.getAll);

  const getIssueLabels = Promise.promisify(github.issues.getIssueLabels);

  return getAllPullRequests({ owner, repo, state: 'closed' })
    .then(lastMergedPullRequestNumber)
    .then(number => getIssueLabels({ owner, repo, number }))
    .then(versionFromLabels);
};

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

module.exports.lastMergedPullRequestNumber  = lastMergedPullRequestNumber;
