import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

// import webpack from 'webpack'
import path from 'path'

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.ts',
        hooks: './src/hooks/index.ts',
        contexts: './src/contexts/index.ts',
        Breadcrumb: './src/components/Breadcrumb/index.ts',
        Button: './src/components/Button/index.ts',
        Card: './src/components/Card/index.ts',
        Dropdown: './src/components/Dropdown/index.ts',
        ErrorBoundary: './src/components/ErrorBoundary/index.ts',
        Flex: './src/components/Flex/index.ts',
        GoBack: './src/components/GoBack/index.ts',
        GoHome: './src/components/GoHome/index.ts',
        Grid: './src/components/Grid/index.ts',
        Gridified: './src/components/Gridified/index.ts',
        Icon: './src/components/Icon/index.ts',
        Link: './src/components/Link/index.ts',
        Modal: './src/components/Modal/index.ts',
        Spinner: './src/components/Spinner/index.ts',
    },
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            react: path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: '[name].css' })],
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
}
