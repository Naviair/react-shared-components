const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Export a function. Accept the base config as the only param.
module.exports = {
	stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-ant-design'],

	webpackFinal: async (config, { configType }) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.

		// Make whatever fine-grained changes you need
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../'),
		});

		//Fix for running latest ECMASCRIPT changes, needed for react-pdf ("pdfjs-dist") with webpack 4
		config.module.rules.push({
			test: /\/pdfjs-dist\//,
			loader: require.resolve('babel-loader'),
			options: {
				presets: [
					[
						// Latest stable ECMAScript features
						require('@babel/preset-env').default,
					],
				],
			},
		});

		// Return the altered config
		return config;
	},
};
