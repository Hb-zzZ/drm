module.exports = {
  managers: {
    yarn: {
      defaultRegistry: 'yarn',
      get: 'yarn config get registry',
      set: 'yarn config set registry {{registry}}',
    },
    npm: {
      defaultRegistry: 'npm',
      get: 'npm config get registry',
      set: 'npm config set registry {{registry}}',
    },
    pnpm: {
      defaultRegistry: 'npm',
      get: 'pnpm get registry',
      set: 'pnpm config set registry {{registry}}',
    },
  },
  shorthandMap: {
    Y: 'yarn',
    N: 'npm',
    P: 'pnpm',
  },
}
