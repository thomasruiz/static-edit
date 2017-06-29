'use strict'

var gulp        = require('gulp')
var browserify  = require('browserify')
var source      = require('vinyl-source-stream')
var tsify       = require('tsify')
var uglify      = require('gulp-uglify')
var sourcemaps  = require('gulp-sourcemaps')
var buffer      = require('vinyl-buffer')
var replace     = require('gulp-replace');
var ts          = require('gulp-typescript');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');

gulp.task('build', function () {
    var merge     = require('merge2');
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult  = tsProject.src().pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('./definitions')),
        tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
    ]);
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false}).pipe(clean());
});

gulp.task('watch', ['default'], function () {
    gulp.watch('src/*.ts', ['default']);
});

gulp.task('default', [], function (cb) {
    runSequence('clean', 'build', 'browser', 'deploy', cb);
});

let compile = (debug) => browserify({
    basedir     : '.',
    debug       : debug,
    entries     : ['src/editor.ts'],
    cache       : {},
    standalone  : 'StaticEdit',
    packageCache: {}
}).plugin(tsify, {target: 'es5'}).bundle()

gulp.task('browser', function () {
    return compile(true)
        .pipe(source('static-edit.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
})

gulp.task('deploy', function () {
    return compile(false)
        .pipe(source('static-edit.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
})
