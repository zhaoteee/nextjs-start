const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  modifyVars: { '@primary-color': '#f74a49' },
  cssLoaderOptions: {
    esModule: false,
    sourceMap: false,
    modules: { mode: 'local' }
  },
  webpack(config) {
    return config;
  },
  future: {
    // if you use webpack5
    webpack5: true,
  },
  images: {
    domains: ['cdn.jsdelivr.net', 'www.downdemo.com'],
    loader: 'imgix',
    path: '',
  }
});