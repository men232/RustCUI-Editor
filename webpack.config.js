const webpack = require('webpack');
const _ = require('lodash');

// Configs
const def_config = require('./config/config.json');
const NODE_ENV = process.env.NODE_ENV || 'dev';
const config = require('./config/config_' + NODE_ENV + '.json');

_.defaultsDeep(config, def_config);

// Plugins
const CompressionPlugin = require('compression-webpack-plugin');

const opts = {
	context: __dirname,
	entry: './src/index.js',
	output: {
		path: __dirname + '/public/dist',
		publicPath: '/dist/',
		filename: 'bundle.js',
		library: 'bundle'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'ng-annotate!babel?plugins=async-to-promises&presets=es2015',
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		}, {
			test: /\.html$/,
			exclude: /index\.html/,
			loader: 'html?interpolate'
		}, {
			test: /\.(png|gif|jpg|svg|ttf|eot|woff|woof2)/,
			include: /\/node_modules\//,
			loader: 'file?name=[1].[ext]&regExp=node_modules/(.*)'
		}, {
			test: /\.(png|gif|jpg|svg|ttf|eot|woff|woof2)/,
			exclude: /\/node_modules\//,
			loader: 'file?name=[path][name].[ext]'
		}]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.query': 'jquery',
			'window.jQuery': 'jquery',
			'$require': __dirname + '/src/lib/ng-require.js',
			'swal': __dirname + '/src/lib/sweet-alert'
		}),
		new webpack.DefinePlugin({
			'require.specified': 'require.resolve',
			'ENV_CONFIG': JSON.stringify(config.envConfig)
		})
	],
	resolve: {
		extensions: ['', '.web.coffee', '.web.js', '.coffee', '.js'],
	}
};

if (NODE_ENV == 'prod') {
	opts.plugins.push(
		new webpack.optimize.CommonsChunkPlugin({
			children: true,
			async: true,
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				sequences: true,
				booleans: true,
				loops: true,
				unused: true,
				warnings: false,
				drop_console: NODE_ENV == 'prod',
				unsafe: true
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		})
	);
}

module.exports = _.defaultsDeep(opts, config);