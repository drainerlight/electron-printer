# electron-printer
# electron-printer
node-printer fork to be used with electron. It's a fork from node-printer whose binaries are released on GitHub. Please refer to https://github.com/tojocky/node-printer on how to use these APIs.

## Requirements
- Install the Node.js version that matches your target Electron. Electron >= 35 requires Node 22; Electron 29-34 work with Node 20.
- A valid `NODE_PRE_GYP_GITHUB_TOKEN` env var to publish binaries to GitHub Releases.

## Build & release (local)
Prebuilds are now driven by `scripts/release.js`, which takes the target Electron version dynamically.

Examples:
- Linux/macOS: `ELECTRON_TARGET=39.0.0 yarn release-linux`
- Windows: `ELECTRON_TARGET=39.0.0 yarn release-win`

Optional overrides:
- `TARGET_PLATFORM` / `TARGET_ARCH` to force a specific triplet (defaults to the host platform/arch).
- `npm_config_target` or `--target=39.0.0` also work because the script reads `npm_config_target`.

## Prebuilt Binaries

This package uses `node-pre-gyp` to attempt to download prebuilt binaries from GitHub Releases.
Prebuilds are matched based on the package version. For example, if you install version `X.Y.Z`, `node-pre-gyp` will look for binaries under the `X.Y.Z` release/tag on GitHub.

The expected path for these binaries is `https://github.com/drainerlight/electron-printer/releases/download/{version}/electron-v{target}-{platform}-{arch}.tar.gz`, where:
- `{version}` is the package version (e.g., `0.2.0`).
- `{target}` is the Electron version targeted by the prebuild (e.g., `39.0.0`).
- `{platform}` is your operating system (e.g., `linux`, `win32`, `darwin`).
- `{arch}` is your system architecture (e.g., `x64`, `ia32`).

If a prebuilt binary is not found for your specific platform, architecture, or the Electron version targeted by the prebuilds, installation will automatically fall back to building from source using `node-gyp`. This ensures that the package can still be installed even if a suitable prebuilt binary is not available.

## CI builds
The workflow in `.github/workflows/prebuild.yml` builds preloads for Linux and Windows for Electron versions 29 through 39.0.0 using `scripts/release.js` and uploads them as GitHub Release assets on published releases (or as artifacts on manual dispatch).
