'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const rename = require('gulp-rename');
const debug = require('gulp-debug');
const addSrc = require('gulp-add-src');

//npm install -g "gulpjs/gulp-cli#4.0"

const path = require('path');

const dist = 'www';

const paths = [
	'./front/administration/**/*.*',
	'./front/site/**/*.*',
	'./front/common/**/*.*'
];

const pathForTypes = function(postfixes){
	return paths.map(function(s){
		return s.slice(0,-1) + postfixes;
	});
};
//['png', 'ico', 'svg']
//`{${postfix.join(',')}}`

gulp.task('clean', function() {
	return del(dist + '/*');
});

gulp.task('assets', function(){
	return gulp.src(pathForTypes(`{${['png', 'ico', 'svg'].join(',')}}`), {base:'front'})
		.pipe(rename(function(filepath) {
			return filepath.dirname = path.join(filepath.dirname.split(path.sep)[0], 'assets');
		}))
		.pipe(gulp.dest(path.join(dist, 'customs')));
});

gulp.task('styles:vendor', function() {
	return gulp.src(paths)//, {base: sectionsPathsKeys[i]}
		.pipe()
		//.pipe(concat('vendor.css'))
		//.pipe(cssnano())

		.on('data',function(file){
			console.log(file.path);
		})

		.pipe(gulp.dest(dist));


});

gulp.task('styles:customs', function() {
	return gulp.src(paths, {base:'front'})
		.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(concat('customs.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(rename(function(filepath) {
			return filepath.dirname = path.join(filepath.dirname.split(path.sep)[0], 'styles');
		}))
		.pipe(gulp.dest(dist));
});

//gulp.task('styles', gulp.parallel('styles:vendors'));

// The default task (called when you run `gulp` from cli)
gulp.task('default', gulp.series('clean', 'assets'));