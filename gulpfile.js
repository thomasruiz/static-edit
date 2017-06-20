'use strict'

var gulp       = require('gulp')
var browserify = require('browserify')
var source     = require('vinyl-source-stream')
var tsify      = require('tsify')
var uglify     = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var buffer     = require('vinyl-buffer')

let compile = (debug) => browserify({
    basedir     : '.',
    debug       : debug,
    entries     : ['src/main.ts'],
    cache       : {},
    packageCache: {}
}).plugin(tsify).bundle();

gulp.task('default', function () {
    return compile(true)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
})

gulp.task('deploy', function () {
    return compile(false)
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
})
