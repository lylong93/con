const path = require("path")

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	entry:path.resolve(__dirname,"index.js"),
	output:{
		path: path.resolve(__dirname,"dist")
	},
	module:{
		rules:[
			{
				test:/\.m?js$/,
				exclude:/(node_modules)/,
				use:[
				{
					loader:"babel-loader",
					options:{
						presets: ['@babel/preset-env']
					}
				}]
			}
		]
	}
}