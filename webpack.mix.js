const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
 //added
 const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
 const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
 var webpackConfig = {
    plugins: [
        new VuetifyLoaderPlugin(),
        new CaseSensitivePathsPlugin()
        // other plugins ...
    ]
    // other webpack config ...
}
mix.webpackConfig(webpackConfig);
//added

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
