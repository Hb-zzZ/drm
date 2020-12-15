# ptm

`ptm` can help you switch [`npm` or `yarn`] registries.

[![npm](https://img.shields.io/npm/v/ptm.svg)](https://www.npmjs.com/package/ptm)

## Install

```
$ npm install -g ptm
// or
$ yarn global add ptm
```

## Example

```
    ptm ls

    // N for npm, Y for yarn
    npm --- https://registry.npmjs.org/
    cnpm --- http://r.cnpmjs.org/
  N taobao --- https://registry.npm.taobao.org/
  Y yarn --- https://registry.yarnpkg.com/

```

```
    ptm use cnpm yarn  // yarn switch registry to cnpm

  Y cnpm --- http://r.cnpmjs.org/
  N taobao --- https://registry.npm.taobao.org/

```

```
    ptm use taobao  // both switch registry to taobao

  // * for both
  * taobao --- https://registry.npm.taobao.org/

```

```
    ptm add private http://127.0.0.1:8888

    You have added private successfully!

```

```
    ptm del private

    You have deleted private successfully!

```

## Usage

```
    Usage: ptm [options] [command]

    Options:
    -V, --version          output the version number
    -h, --help             display help for command

    Commands:
    list|ls                List all the registries
    use <name> [type]      Change registry to target registry
    add <name> <registry>  Add new custom registry
    del <name>             Delete the custom registry
    test [name]            Show response time for specific or all registries
    help                   Print out for help
```

## Registries

- [npm](https://www.npmjs.org)
- [cnpm](http://cnpmjs.org)
- [taobao](http://npm.taobao.org)
- [yarn](https://yarnpkg.com)

## LICENSE

MIT
