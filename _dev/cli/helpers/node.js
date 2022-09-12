const semver = require('semver');
const execa = require('execa');
const which = require('which');

exports.nodeModuleChecker = (supportedNodeVersion) => semver.satisfies(process.version, supportedNodeVersion, { includePrerelease: true });

exports.detectYarn = () => which.sync('yarn', { nothrow: true });

exports.detectPnpm = () => which.sync('pnpm', { nothrow: true });
