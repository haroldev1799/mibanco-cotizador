const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mibanco_cotizador',
  filename: 'remoteEntry.js',
  exposes: {
    './Module': './src/app/app.module.ts',
  },
});