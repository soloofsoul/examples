'use strict';

var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    concatCss = require('gulp-concat-css'),
    cleanCss = require('gulp-clean-css'),
    config = {
        detailedLogging: true,
        dev: {
            browser: 'chrome',
            defaultUri: 'http://localhost:8090/dev/index.html'
        },
        path: {
            srcOutputPath: './dist',
            cssSrc: './styles/**/*.css'
        },
        dist: {
            cssMinName: 'proj.min.css',
            cssSingleName: 'proj.css'
        },
        taskConsoleStr: '--- Test project: '
    };

gulp.task('clean', function() {
    console.log(config.taskConsoleStr + 'Cleaning ---');

    del([
        config.path.srcOutputPath + '/**',
        '!' + config.path.srcOutputPath
    ]).then(function(paths){
        if(config.detailedLogging)
            console.log('    Deleted: ' + paths.join('\n    Deleted: '))
    });
});

gulp.task('serve', function() {
    connect.server({
        port: 8090,
        host: 'localhost',
        livereload: true
    });
});

gulp.task('open-dev', function(){
    return gulp.src(__filename).pipe(open({ uri: config.dev.defaultUri, app: config.dev.browser }));
});

gulp.task('create_single_css', function() {
    return gulp.src(config.path.cssSrc)
        .pipe(concatCss('proj.css'))
        .pipe(gulp.dest(config.path.srcOutputPath));
});

gulp.task('create_min_css', ['create_single_css'], function() {
    return gulp.src(config.path.cssSrc)
        .pipe(concatCss('proj.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest(config.path.srcOutputPath));
});

gulp.task('html', function() {
    gulp.src('./dev/*.html')
        .pipe(connect.reload());
});

gulp.task('css', ['create_min_css'],  function(){
    gulp.src('./dist/' + config.dist.cssMinName)
        .pipe(connect.reload());
});

gulp.task('serve-dev', function() {
    runSequence('serve', 'open-dev');
    gulp.watch(['./dev/*.html'], ['html']);
    gulp.watch(['./styles/**/*.css'], ['css']);
});