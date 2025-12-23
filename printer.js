var fs = require('fs');
var path = require('path');
var binary = require('@mapbox/node-pre-gyp');

function findBinding() {
  // Try the default node-pre-gyp resolution first.
  try {
    var resolved = binary.find(path.resolve(path.join(__dirname, './package.json')));
    if (resolved && fs.existsSync(resolved)) {
      return resolved;
    }
  } catch (_) {
    // Ignore and fall back to manual resolution below.
  }

  var platform = process.platform;
  var arch = process.arch;
  var electronVer = process.versions.electron || '';
  var releaseDir = path.join(__dirname, 'build', 'Release');
  var candidates = [];

  if (electronVer) {
    candidates.push(path.join(releaseDir, 'electron-v' + electronVer + '-' + platform + '-' + arch, 'node_printer.node'));
  }

  candidates.push(path.join(releaseDir, 'electron-v-' + platform + '-' + arch, 'node_printer.node'));

  var found = candidates.find(function (p) {
    return fs.existsSync(p);
  });

  if (!found) {
    throw new Error('node_printer.node not found in: ' + candidates.join(', '));
  }

  return found;
}

var bindingPath = findBinding();
var printer = exports = module.exports = require(bindingPath);
