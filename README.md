# ptm

`ptm` can help you switch [`npm`,`yarn`,`pnpm` or `custom manager`] registries.

[![npm](https://img.shields.io/npm/v/ptm.svg)](https://www.npmjs.com/package/ptm) ![GitHub repo size](https://img.shields.io/github/repo-size/Hb-zzZ/ptm) ![GitHub top language](https://img.shields.io/github/languages/top/Hb-zzZ/ptm) ![NPM](https://img.shields.io/npm/l/ptm)

## Install

```
$ npm install -g ptm
// or
$ yarn global add ptm
```

## Example

```
        ptm ls

        [yarn,npm,pnpm] npm --- https://registry.npmjs.org/
                        cnpm --- http://r.cnpmjs.org/
                        taobao --- https://registry.npm.taobao.org/
                        yarn --- https://registry.yarnpkg.com/

```

```
        ptm use cnpm yarn|Y  // yarn switch registry to cnpm

        [yarn] cnpm --- http://r.cnpmjs.org/

```

```
        ptm use taobao  // both switch registry to taobao

        [yarn,npm,pnpm] taobao --- https://registry.npm.taobao.org/

```

```
        ptm add private http://127.0.0.1:8888

        You have added private successfully!

```

```
        ptm del private

        You have deleted private successfully!

```

```
Support in 1.0.5+
                                                                                  default registry  manager shorthand
                                                                                                ⏫  ⏫
        ptm add-manager yarn "yarn config get registry" "yarn config set registry {{registry}}" cnpm Y
                        ⏬                ⏬                            ⏬
        the name of the custom manager    ⏬    set registry method( {{registry}} will replace the selected registry)
                                          ⏬               ⏬
                                  get registry method      ⏬
                                                  ⏬       ⏬
                                                 need to have " "

        You have added yarn manager successfully!

```

```
Support in 1.0.5+

        ptm del-manager yarn

        You have deleted yarn manager successfully!

```

## Usage

```
        Usage: ptm [options] [command]

        Options:
        -V, --version                                                                    output the version number
        -h, --help                                                                       display help for command

        Commands:
        list|ls                                                                          List all the registries
        use <name> [manager]                                                             Change registry to target registry
        add <name> <registry>                                                            Add new custom registry
        del <name>                                                                       Delete the custom registry
        test [name]                                                                      Show response time for specific or all registries
        add-manager <manager> <getRegistry> <setRegistry> [defaultRegistry] [shorthand]  Add new custom manager
        del-manager <manager>                                                            Delete the custom manager
        help                                                                             Print out for help
```

## Registries

- [npm](https://www.npmjs.org)
- [cnpm](http://cnpmjs.org)
- [taobao](http://npm.taobao.org)
- [yarn](https://yarnpkg.com)

## Thanks

If you find this project useful, you can give me a [[star](https://github.com/Hb-zzZ/ptm)].

## LICENSE

MIT

## Feature

Run faster.

## ChangeLog

[ChangeLog](./CHANGELOG.md)
