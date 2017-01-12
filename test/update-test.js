import { describe, it, before, after } from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import GitHubApi from 'github';
import { nextVersion } from './../lib/update.js';

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('nextVersion', () => {
  describe('minor', () => {
    it('version change success', done => {
      expect(nextVersion({ from: '0.0.0', to: 'minor' }))
        .to
        .eventually
        .equal('0.1.0')
        .notify(done);
   });
  });

  describe('major', () => {
    it('version change success', done => {
      expect(nextVersion({ from: '0.0.0', to: 'major' }))
        .to
        .eventually
        .equal('1.0.0')
        .notify(done);
    });
  });

  describe('github', () => {
    const opt = {
      github: GitHubApi(),
      token: process.env.GITHUB_TOKEN,
      owner: 'ksespinola',
      repo: 'package-version-test',
      number: 3
    };

    describe('major', () => {
      before(() => {
        sinon
          .stub(opt.github.issues, "getIssueLabels")
          .yieldsAsync(
            null,
            [{ name: 'major' }, { name: 'foo' }]
          );
      });

      after(() => opt.github.issues.getIssueLabels.restore());

      it('version change success', done => {
        expect(nextVersion({ from: '0.0.0', to: 'github', opt }))
          .to
          .eventually
          .equal('1.0.0')
          .notify(done);
      });
    });


    describe('minor', () => {
      before(() => {
        sinon
          .stub(opt.github.issues, "getIssueLabels")
          .yieldsAsync(
            null,
            [{ name: 'minor' }, { name: 'foo' }]
          );
      });

      after(() => opt.github.issues.getIssueLabels.restore());

      it('version change success', done => {
        expect(nextVersion({ from: '0.0.0', to: 'github', opt }))
          .to
          .eventually
          .equal('0.1.0')
          .notify(done);
      });
    });
  });
});
