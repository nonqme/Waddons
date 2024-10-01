# WAddons

WAddons is a tool for managing World of Warcraft addons. It allows easy installation and uninstallation of addons from CurseForge.

## Prerequisites

- Node.js >= 21.0.0
- npm

## Installation

Clone the repository and install the dependencies:

```sh
git clone https://github.com/nonqme/Waddons.git
cd waddons
npm install
npm run build
npm link 
```

## Usage

Install an addon:

To install an addon, use the following command:

```sh
waddons install <addon-id>
```

optionally, you can specify the path to the World of Warcraft addon folder:

```sh
waddons install <addon-id> --path <path>
```

or provide the CurseForge API key:

```sh
waddons install <addon-id> --key <key>
```

and if you don't want to enter the API key and path every time, you can create a configuration file:

```sh
echo config.json > {"key": "<key>", "path": "<path>"}
waaddons install <addon-id> --config config.json
```

Uninstall an addon:

To uninstall an addon, use the following command:

```sh
waddons uninstall 
```

a list of installed addons will be displayed, and you will be prompted to select the addon to uninstall.
