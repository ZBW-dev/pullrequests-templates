/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@prefresh/snowpack',
    process.env.NODE_ENV === 'develop'
      ? 'snowpack-plugin-web-ext'
      : [
          'snowpack-plugin-copy',
          {
            patterns: [
              {
                source: 'manifest.json',
                destination: 'build',
              },
            ],
          },
        ],
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    installTypes: true,
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    metaDir: 'snowpack_meta', // chrome issue with __snowpack__ because _ is reserved for system
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    "react": "preact/compat",
    "react-dom": "preact/compat"
  }
};
