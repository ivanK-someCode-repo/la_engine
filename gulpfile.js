'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var merge = require('merge-stream');

var dist = './www/site/dist';

var paths = {
	scripts: ['./www/site/sources/scripts/**/*.js'],
	less: './www/site/sources/styles/**/*.less',
	css: './www/site/sources/styles/**/*.css'
};

gulp.task('styles', function() {
	var lessFile = gulp.src(paths.less)
		.pipe(less())
		.pipe(concat('less-file.less'))
	;
	var cssFile = gulp.src(paths.css)
		.pipe(concat('css-file.css'))
	;
	return merge(lessFile, cssFile)
		.pipe(concat('app.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(dist));
	/*	
    return gulp.src(paths.less)
		.pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
		*/
});

gulp.task('build', function () {
	browserify({
		entries: './www/site/sources/index.jsx',
		extensions: ['.jsx'],
		debug: true
	})
	.transform(babelify.configure({
		presets: ["es2015", "react"]})
	)
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest(dist));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build', 'styles']);