#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const preGypBin = require.resolve('@mapbox/node-pre-gyp/bin/node-pre-gyp');
const resolvePlatform = () => {
  const val = process.argv[2] || process.env.TARGET_PLATFORM || process.env.npm_config_platform || process.platform;
  // Guard against literals like "process.platform" that can leak from env on Windows CI
  return val === 'process.platform' ? process.platform : val;
};

const resolveArch = () => {
  const val = process.env.TARGET_ARCH || process.env.npm_config_arch || process.arch;
  return val === 'process.arch' ? process.arch : val;
};

const targetPlatform = resolvePlatform();
const targetArch = resolveArch();
const electronTarget = process.env.ELECTRON_TARGET || process.env.npm_config_target || '36.4.0';
const distUrl = 'https://electronjs.org/headers';

function run(args) {
  const result = spawnSync(process.execPath, [preGypBin, ...args], {
    stdio: 'inherit',
    env: process.env,
    cwd: process.cwd(),
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run([
  'rebuild',
  '--runtime=electron',
  `--target=${electronTarget}`,
  `--target_platform=${targetPlatform}`,
  `--target_arch=${targetArch}`,
  `--dist-url=${distUrl}`,
]);

run([
  'package',
  '--runtime=electron',
  `--target=${electronTarget}`,
  `--target_platform=${targetPlatform}`,
  `--target_arch=${targetArch}`,
]);
