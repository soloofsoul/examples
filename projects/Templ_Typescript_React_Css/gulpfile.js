'use strict';

var gulp = require('gulp'),
    open = require('gulp-open'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence'),
    webpack = require('webpack-stream'),
    del = require('del'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    minifyJs = require('gulp-minify');

var config = {
    dev: {
        browser: 'chrome',
        defaultUri: 'http://localhost:8090/dev/index.html'
    },
    path: {
        dist: './dist',
        lib: './lib',
        sourcePath: ['scripts/**/*.ts', 'src/**/*.ts'],
        cssSrcPath: './styles/**/*.css'
    },
    dist: {
        jsName: 'proj.js',
        jsMinName: 'proj-min.js',
        cssName: 'proj.css',
        cssMinName: 'proj-min.css',
        jsEntryPoint: 'app.js'
    },
    isDetailedLog: true,
    projConsoleStr: '--- PROJ | '
};

gulp.task('clean_js', function() {
    console.log(config.projConsoleStr + '1. Cleaning generated .js files from "' + config.path.dist + '" directory:');

    var clean = del([ config.path.dist + '/*.js' ]);

    if(config.isDetailedLog)
        clean.then(paths => { console.log('   ', paths.join('\n    ')) });
});

gulp.task('clean_lib', function(){
    console.log(config.projConsoleStr + '2. Cleaning generated(from .ts files) .js files from "' + config.path.lib + '" directory:');

    var clean = del([config.path.lib + '/**', '!' + config.path.lib]);

    if(config.isDetailedLog)
        clean.then(paths => { console.log('   ', paths.join('\n    ')) });
});


gulp.task('build_source', ['clean_lib'], function(){
    console.log(config.projConsoleStr + '3. Compiling .ts files to .js files into "' + config.path.lib + '" directory.');

    return gulp.src(config.path.sourcePath)
        .pipe(ts({
            target: 'ES5',
            module: 'commonjs',
            noEmitOnError: true,
            removeComments: false,
            noEmitHelpers: true,
            typescript: require('typescript')
        })).js
        .pipe(sourcemaps.write('.', { includeContent: false }))
        .pipe(gulp.dest(config.path.lib));
});

gulp.task('clean_css', function() {
    console.log(config.projConsoleStr + '4. Cleaning generated .css files from "' + config.path.dist + '" directory.');

    var clean = del([ config.path.dist + '/*.css' ]);

    if(config.isDetailedLog)
        clean.then(paths => { console.log('   ', paths.join('\n    ')) });
});

gulp.task('generate_css', ['clean_css'], function() {
    console.log(config.projConsoleStr + '5. Creating one .css file "' + config.dist.cssName + '" by concatenating .css files in "styles" directory; Minifying it ("' + config.dist.cssName + '") into "' + config.dist.cssMinName + '" file.');
    return gulp.src(config.path.cssSrcPath)
        .pipe(concatCss(config.dist.cssName))
        .pipe(gulp.dest(config.path.dist))
        .pipe(concatCss(config.dist.cssMinName))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.path.dist));
});

gulp.task('create_bundle', ['build_source'], function(){
    console.log(config.projConsoleStr + '6. Concatenate all .js files(compiled from .ts files) into one "' + config.dist.jsName + '" file.');
    return gulp.src(config.path.lib + '/' + config.dist.jsEntryPoint)
        .pipe(webpack({
            output: {
                filename: config.dist.jsName
            },
            externals: {

            },
            devtool: 'source-map'
        }))
        .pipe(gulp.dest(config.path.dist));
});

gulp.task('generate_js', ['clean_js', 'create_bundle'], function() {
    console.log(config.projConsoleStr + '7. Concatenate all .js files(from "' + config.path.dist + '" directory) into one "' + config.dist.jsMinName + '" file.');
    return gulp.src(config.path.dist + '/*.js')
        .pipe(minifyJs({
            ignoreFiles: [config.dist.jsMinName]
        }))
        .pipe(gulp.dest(config.path.dist));
});

gulp.task('serve-dev', ['generate_js', 'generate_css'], function(){
    console.log(config.projConsoleStr + '8. Starting server for "index.html" file in "dev" directory.');
    runSequence('serve', 'open-dev');
    gulp.watch(['./dev/*.html'], ['html']);
    gulp.watch(['./src/**/*.ts'], ['ts']);
    gulp.watch(['./styles/**/*.css'], ['css']);
});

gulp.task('serve', function(){
    console.log(config.projConsoleStr + '9. Starting "localhost" server on 8090 port.');
    connect.server({
        port: 8090,
        host: 'localhost',
        livereload: true
    });
});

gulp.task('open-dev', function(){
    console.log(config.projConsoleStr + '10. Opening "index.html" from "dev" directory in browser.');
    return gulp.src(__filename).pipe(open({ uri: config.dev.defaultUri, app: config.dev.browser }));
});

gulp.task('html', function() {
    console.log(config.projConsoleStr + '*. Reloading in browser .html files in "dev" directory after changes.');
    gulp.src('./dev/*.html')
        .pipe(connect.reload());
});

gulp.task('css', ['generate_css'],  function(){
    console.log(config.projConsoleStr + '*. Regenerating and reloading in browser .css files after changes.');
    gulp.src('./dist/' + config.dist.cssMinName)
        .pipe(connect.reload());
});

gulp.task('ts', ['generate_js'],  function(){
    console.log(config.projConsoleStr + '*. Regenerating and reloading in browser .js files after changes.');
    gulp.src('./dist/' + config.dist.jsMinName)
        .pipe(connect.reload());
});

