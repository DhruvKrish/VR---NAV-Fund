const path=require('path');

module.exports = {
	// entry: './src/main.ts'
	entry: path.resolve(_dirname, '../src/main.ts'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(_dirname,'dist'),
		publicPath: 'dist'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	devServer: {
		historyApiFallback: {
			rewrites: [
				{
					from: /./,to:'/src/index.html'
				}
			]
		}
	}
};