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
const jsonTransform = require('gulp-json-transform');

const path = require('path');

const dist = 'www';

const paths = {
	sections:[
		{
			base: 'administration',
			srcPath:'./front/administration/**/*.*'
		},
		{
			base: 'site',
			srcPath: './front/site/**/*.*'
		},
		{
			base: 'common',
			srcPath: './front/common/**/*.*'
		}
	]
};

const typesPostfixes = {
	js: 'es6',
	css: 'less',
	assets: ['png', 'ico', 'svg']
};

gulp.task('clean', function() {
	return del(dist + '/*');
});

gulp.task('assets', function(){
	let dests = [],
		i = 0;

	for (; i < paths.sections.length; i++){
		dests.push(paths.sections[i].srcPath.slice(0,-1) + `{${typesPostfixes.assets.join(',')}}`);
	}

	return gulp.src(dests, {base:'front'})
		.pipe(rename(function(filepath) {
			for (let i = 0; i < paths.sections.length; i++){
				let pathSection = paths.sections.find(x => filepath.dirname.indexOf(x.base) > -1);

				if (pathSection){
					return filepath.dirname = path.join(pathSection.base, 'assets');
				}
			}
		}))
		.pipe(gulp.dest(dist));
			//return file.cwd + '\\' + dist + '\\' + pathSection.base + '\\' + path.basename(file.path);
});

gulp.task('styles:vendor', function() {
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
			.pipe(gulp.dest('./dist/out/'))
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

gulp.task('styles:customs', function() {
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
gulp.task('default', gulp.series('clean', 'assets'));