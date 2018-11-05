module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: { minimize: false }
        }
      }
    ]
  }
}
