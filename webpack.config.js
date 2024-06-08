const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const OptimizePlugin = require('optimize-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	mode: 'production',
	entry: './src/main.js',
	// output: {
	// 	path: path.resolve(__dirname, 'dist'),
	// 	filename: 'bundle.js',
	// 	clean: true,
	// },
	output: {
	  filename: '[name].[contenthash].js',
	  path: path.resolve(__dirname, 'dist'),
	  clean: true,
	},
	module: {
		rules: [
			{
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
			{
				test: /.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new HtmlWebpackPlugin({
            template: './src/main.html', 
            filename: 'index.html',
        }),
		new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/images', to: 'images' },
            ],
        }),
		// new OptimizePlugin(),
		// new BundleAnalyzerPlugin(),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {},
				},
			}),
			new CssMinimizerPlugin(),
		],
	},
	// devtool: 'source-map',
}
