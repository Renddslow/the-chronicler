<div align="center">
  <img src="https://github.com/Renddslow/the-chronicler/raw/main/takua.png" alt="Takua - The Chronicler" width="400" />
</div>

<h1 align="center">The Chronicler</h1>

> A CLI for auto updating a [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) changelog for a given release.

## Install

```
$ yarn add -D the-chronicler
```

## Usage

The Chronicler exposes one command at present for releasing a CHANGELOG.

```
  Description
    A CLI for auto updating a [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) changelog for a given release.

  Usage
    $ the-chronicler <command> [options]

  Available Commands
    release

  For more info, run any command with the `--help` flag
    $ the-chronicler release --help

  Options
    -v, --version    Displays current version
    -h, --help       Displays this message
```

### `the-chronicler release`

```
  Description
    Take the contents of the unreleased section and move it to a new release

  Usage
    $ the-chronicler release <version> [options]

  Options
    -f, --filename         (default CHANGELOG.md)
    -l, --linkPattern
    -h, --help           Displays this message
```

## Config

The Chronicler uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for configuration file support. This means you can configure The Chronicler via (in order of precedence):

- A `"chronicler"` key in your `package.json` file.
- A `.chroniclerrc` file written in JSON or YAML.
- A `.chroniclerrc.json`, `.chroniclerrc.yml`, `.chroniclerrc.yaml`, or .`chroniclerrc.json5` file.
- A `.chroniclerrc.js`, `.chroniclerrc.cjs`, `chronicler.config.js`, or `chronicler.config.cjs` file that exports an object using `module.exports`.
- A `.chroniclerrc.toml` file.

### Filename

Specify the filename of your changelog.

> **In accord with [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) I recommend using CHANGELOG.md as your filename of choice.**
>
> "While it's easy to think that the name of your changelog file doesn't matter that much, why make it harder for your end users to consistently find notable changes?"

| Default        | CLI Override          | Config Override      |
| -------------- | --------------------- | -------------------- |
| `CHANGELOG.md` | `--filename <string>` | `filename: <string>` |

### Link Pattern

Specify the link to the version in your representation of choice.

> ⚠️ **Warning** ⚠️
>
> The Chronicler expects that you are using [link reference definitions](https://github.github.com/gfm/#link-reference-definition) and that _at least_ an `unreleased` link exist there.

| CLI                      | API                     |
| ------------------------ | ----------------------- |
| `--linkPattern <string>` | `linkPattern: <string>` |

An example of this for GitHub version tags:

```
https://github.com/Renddslow/the-chronicler/compare/{{prev}}...{{next}}
```

#### Template

Link patterns offer simple templating via [templite](https://github.com/lukeed/templite). Variables provided are `prev` and `next`, representing the previous version recorded in the CHANGELOG and the version that is presently being released (respectively).

## Roadmap

Below are a few commands that are forthcoming.

- `fix` - The place I presently work (as well as a number of my own packages) didn't realize that Keep a Changelog recommended [link reference definitions](https://github.github.com/gfm/#link-reference-definition) for version numbers. Instead, we interpreted the square brackets as stylistic. `fix` will translate release sections to corresponding link reference definitions automagically.
