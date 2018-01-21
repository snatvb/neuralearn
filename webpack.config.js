const webpack = require( 'webpack' );
const HTMLPlugin = require( 'html-webpack-plugin' );
const { resolve, join } = require( "path" );
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

function createPlugins() {
	const plugins = [
		new HTMLPlugin( {
			inject: true,
			template: resolve( __dirname, 'src/index.html' ),
			// favicon: resolve(__dirname, 'assets/favicon.png')
		} ),
		new webpack.NoEmitOnErrorsPlugin(),
		new CleanWebpackPlugin(['dist'], { root: process.cwd() }),
	];
	return plugins;
}

module.exports = {
	context: __dirname,
	entry: resolve( __dirname, "./src/index.ts" ),
	output: {
		path: join( __dirname, './dist' ),
		pathinfo: true,
		publicPath: '',
		filename: '[name].[hash].js',
		chunkFilename: '[id].[chunkhash].js',
		sourceMapFilename: '[file].map'
	},
	devtool: '#source-map',
	resolve: {
		extensions: [ '.js', '.ts' ],
		modules: [ resolve( __dirname, 'node_modules' ), resolve( __dirname, './src' ) ],
	},
	module: {
		rules: [ {
			test: /\.ts$/,
			use: [ {
				loader: "ts-loader"
			} ],
			exclude: /node_modules/
		}, {
			test: /\.(jpe?g|png|gif|svg|bmp)$/i,
			use: [{
				loader: "file-loader",
				options: {
					name: '[sha1:hash:hex].[ext]',
					outputPath: "dist/public/"
				}
			}]
		} ]
	},
	resolveLoader: {
		moduleExtensions: [ "-loader" ]
	},
	plugins: createPlugins(),
};