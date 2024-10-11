import path from 'path';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export default {
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    fallback: {
      fs: false,
      path: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      global: require.resolve('global'),
      // Add more as needed
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
  ],
};
