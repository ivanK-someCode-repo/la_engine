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
const del = require('gulp-del');
const debug = require('gulp-debug');
var jsonTransform = require('gulp-json-transform');

const dist = './www';

const paths = {
	sections:{
		administration: './front/administration/**/*.*',
		site: './front/site/**/*.*',
		common: './front/common/**/*.*'
	},
	typesPostfixes:{
		js: 'es6',
		css: 'less',
		images: 'png',
		vectors: 'svg'
	}
};

gulp.task('styles', function() {
	let sectionsPathsKeys =  Object.keys(paths.sections);

	for (let i = 0; i < sectionsPathsKeys.length; i++){
		gulp.src(paths.sections[sectionsPathsKeys[i]].slice(0,-1) + "json")//, {base: sectionsPathsKeys[i]}
			.on('data',function(file){
				console.log(file.path);
			})
			.pipe(jsonTransform(function(data) {
				return {
					foobar: data.foo + data.bar
				};
			}))
			.pipe(gulp.dest('./dist/out/'));
			.pipe(sourcemaps.init())
				.pipe(less())
				.pipe(concat('customs.css'))
				.pipe(cssnano())
			.pipe(sourcemaps.write())
			.on('data',function(file){
				console.log(file.path);
			})
			.pipe(gulp.dest(dist+'/'+sectionsPathsKeys[i]));
	}
});

gulp.task('vendor-styles', function() {
	let sectionsPathsKeys =  Object.keys(paths.sections);

	for (let i = 0; i < sectionsPathsKeys.length; i++){
		gulp.src(paths.sections[sectionsPathsKeys[i]].slice(0,-1) + paths.typesPostfixes.css)//, {base: sectionsPathsKeys[i]}
			.on('data',function(file){
				console.log(file.path);
			})
			.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(concat('customs.css'))
			.pipe(cssnano())
			.pipe(sourcemaps.write())
			.on('data',function(file){
				console.log(file.path);
			})
			.pipe(gulp.dest(dist+'/'+sectionsPathsKeys[i]));
	}
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles']);