'use strict';

var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    concatCss = require('gulp-concat-css'),
    cleanCss = require('gulp-clean-css'),
    minifyJs = require('gulp-minify'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack-stream'),
    config = {
        detailedLogging: true,
        dev: {
            browser: 'chrome',
            defaultUri: 'http://localhost:8090/dev/index.html'
        },
        path: {
            srcOutputPath: './dist',
            cssSrc: './styles/**/*.css',
            sourcePath: ['scripts/**/*.ts', 'src/**/*.ts'],
            libPath: './lib'
        },
        dist: {
            cssMinName: 'proj-min.css',
            cssSingleName: 'proj.css',
            distJsName: 'proj.js',
            distJsMinName: 'proj-min.js',
            entryPoint: 'app.js',
        },
        taskConsoleStr: '--- Test project: '
    };

gulp.task('serve', function() {
    console.log(config.taskConsoleStr + 'Starting localhost server on 8090 port ---');
    connect.server({
        port: 8090,
        host: 'localhost',
        livereload: true
    });
});

gulp.task('open-dev', function(){
    return gulp.src(__filename).pipe(open({ uri: config.dev.defaultUri, app: config.dev.browser }));
});

gulp.task('html', function() {
    gulp.src('./dev/*.html')
        .pipe(connect.reload());
});

gulp.task('clean_css', function() {
    console.log(config.taskConsoleStr + 'Cleaning css ---');

    del([
        config.path.srcOutputPath + '/' + config.dist.cssSingleName,
        config.path.srcOutputPath + '/' + config.dist.cssMinName
    ]).then(function(paths){
        if(config.detailedLogging)
            console.log('    Deleted: ' + paths.join('\n    Deleted: '))
    });
});

gulp.task('generate_css', ['clean_css'], function() {
    return gulp.src(config.path.cssSrc)
        .pipe(concatCss(config.dist.cssSingleName))
        .pipe(gulp.dest(config.path.srcOutputPath))
        .pipe(concatCss(config.dist.cssMinName))
        .pipe(cleanCss())
        .pipe(gulp.dest(config.path.srcOutputPath));
});

gulp.task('css', ['generate_css'], function(){
    gulp.src(config.path.srcOutputPath + '/' + config.dist.cssMinName)
        .pipe(connect.reload());
});

gulp.task('clean_js', function() {
    console.log(config.taskConsoleStr + 'Cleaning js ---');

    del([
        config.path.srcOutputPath + '/' + config.dist.distJsName,
        config.path.srcOutputPath + '/' + config.dist.distJsMinName
    ]).then(function(paths){
        if(config.detailedLogging)
            console.log('    Deleted: ' + paths.join('\n    Deleted: '))
    });
});

gulp.task('build_source', function() {
    console.log(config.taskConsoleStr + 'Building all .ts files in .js files ---');
    return gulp.src(config.path.sourcePath)
        .pipe(ts({
            target: 'ES5',
            module: 'commonjs',
            noEmitOnError: true,
            removeComments: false,
            noEmitHelpers: true
        })).js
        .pipe(sourcemaps.write('.', { includeContent: false }))
        .pipe(gulp.dest(config.path.libPath));
});

gulp.task('create_js', ['build_source'], function() {
    console.log(config.taskConsoleStr + 'Bundling all js files into one "' + config.dist.distJsName + '" ---');
    return gulp.src(config.path.libPath + '/' + config.dist.entryPoint)
        .pipe(webpack({
            output: {
                filename: config.dist.distJsName
            },
            externals: {

            },
            devtool: 'source-map'
        }))
        .pipe(gulp.dest(config.path.srcOutputPath));
});

gulp.task('generate_min_js', ['clean_js', 'create_js'], function() {
    console.log(config.taskConsoleStr + 'Creating minified js file "' + config.dist.distJsMinName + '" ---');
    return gulp.src(config.path.srcOutputPath + '/*.js')
        .pipe(minifyJs({
            ignoreFiles: ['proj-min.js']
        }))
        .pipe(gulp.dest(config.path.srcOutputPath));
});

gulp.task('ts', ['generate_min_js'],  function(){
    gulp.src(config.path.srcOutputPath + '/' + config.dist.distJsMinName)
        .pipe(connect.reload());
});

gulp.task('serve-dev', ['generate_css', 'generate_min_js'], function() {
    runSequence('serve', 'open-dev');
    gulp.watch(['./dev/*.html'], ['html']);
    gulp.watch(['./styles/**/*.css'], ['css']);
    gulp.watch(['./src/**/*.ts'], ['ts']);
});