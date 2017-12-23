const webpack = require('webpack');
const path = require('path');

const DEV = path.resolve(`${__dirname}/app`);
const OUTPUT = path.resolve(`${__dirname}/public`);

const config = {
	entry: `${DEV}/index.js`,
	output: {
		path: OUTPUT,
		filename: 'bundle.js',
	},
	devServer: {
		inline: true,
		contentBase: 'public',
		historyApiFallback: true,
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'react', 'stage-2' ],
					plugins: [
      	    'transform-class-properties',
						'transform-async-to-generator',
      	    // This is for async, await on the front end.
      	    'transform-runtime',
      	  ],
				},
			},
			{
				test: /\.sass?$/,
				loader: [ 'style-loader', 'css-loader', 'sass-loader' ],
			},
			{
				test: /\.scss?$/,
				loader: [ 'style-loader', 'css-loader', 'sass-loader' ],
			},
			{
				test: /\.css?$/,
				loader: [ 'style-loader', 'css-loader' ],
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]',
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
			},
		],
	},
};

module.exports = config;
