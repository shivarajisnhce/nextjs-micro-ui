/** @type {import('next').NextConfig} */
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;

      // Add Module Federation Plugin to the container
      config.plugins.push(
        new ModuleFederationPlugin({
          name: 'container',
          remotes: {
            navigation_ui: 'navigation_ui@https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/navigation-ui/remoteEntry.js',
            recommendations_ui: 'recommendations_ui@https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/recommendations-ui/remoteEntry.js',
            search_ui: 'search_ui@https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/northstar-searchui/remoteEntry.js',
          },
          filename: 'static/chunks/remoteEntry.js',
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: "^18.2.0",
            },
            'react-dom': {
              singleton: true,
              eager: true,
              requiredVersion: "^18.2.0",
            },
            'react/jsx-runtime': {
              singleton: true,
              eager: true,
            },
          },
        })
      );
    }

    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Ignore webpack warnings about externals
    config.ignoreWarnings = [
      { module: /node_modules/ },
      { message: /Can't resolve 'react/ },
      { message: /Can't resolve 'react-dom/ },
    ];

    return config;
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
