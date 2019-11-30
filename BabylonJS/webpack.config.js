module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    },
    devServer: {
        port: 1997
    },
    // externals: {
    //     "oimo": true,
    //     "cannon": true,
    //     "earcut": true,
    //     earcut: 'EARCUT'
    // },
}