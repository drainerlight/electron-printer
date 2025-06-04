# electron-printer
node-printer fork to be used with electron. It's a fork from node-printer which binary are released on github.
It's a temporary solution until binary package will be available for node 5.1.x and
windows / linux platforms for node-printer on electron runtime. Please refer to https://github.com/tojocky/node-printer on
how to use these APIs.

# Prerequisite
Install the node version used by electron (currently is 5.1.1 for electron 0.36.7).
A github valid `NODE_PRE_GYP_GITHUB_TOKEN` must be set as env variable.

# Release & Build
Remember to change the binary host with the correct version (see https://github.com/bchr02/node-pre-gyp-github).
After the release, build the binaries for each OS.

# Linux build
On Ubuntu 15.10, install:
```
sudo apt-get install libudev-dev libusb-1.0-0-dev g++-multilib libudev-dev:i386 libcups2-dev
```
And then run `npm run release-linux` (x64) or `npm run release-linux-ia32` (ia32) to publish
the binary build

# Windows build
Use a  Windows 7 on x64. Install Visual Studio (2013 is OK on Windows 7) and Python 2.7.x
Always specify the VisualStudio version using `--msvs_version=xxxx`, foor instance
`npm i --msvs_version=2013`

Release using  `npm run release-win --msvs_version=2013` (x64) or `npm run release-win-ia32 --msvs_version=2013` (ia32)

# OSx build
After `npm i`, just use `npm run release-darwin` (`npm run release` should work)

## Prebuilt Binaries

This package uses `node-pre-gyp` to attempt to download prebuilt binaries from GitHub Releases.
Prebuilds are matched based on the package version. For example, if you install version `X.Y.Z`, `node-pre-gyp` will look for binaries under the `X.Y.Z` release/tag on GitHub.

The expected path for these binaries is `https://github.com/drainerlight/electron-printer/releases/download/{version}/electron-v36.4.0-{platform}-{arch}.tar.gz`, where:
- `{version}` is the package version (e.g., `0.2.0`).
- `{platform}` is your operating system (e.g., `linux`, `win32`, `darwin`).
- `{arch}` is your system architecture (e.g., `x64`, `ia32`).

If a prebuilt binary is not found for your specific platform, architecture, or the Electron version targeted by the prebuilds (currently electron v36.4.0), the installation will automatically fall back to building from source using `node-gyp`. This ensures that the package can still be installed even if a suitable prebuilt binary is not available.
