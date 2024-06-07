const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	mode: 'production',
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},
	// output: {
	//   filename: '[name].[contenthash].js',
	//   path: path.resolve(__dirname, 'dist'),
	// },
	module: {
		rules: [
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
			filename: 'styles.css',
		}),
		new HtmlWebpackPlugin({
            template: './src/main.html', // Usando seu arquivo HTML atual como template
            filename: 'index.html', // Nome do arquivo de saída
        }),
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
