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
	css: ['less', 'css'],
	assets: ['png', 'ico', 'svg']
};

gulp.task('clean', function() {
	return del(dist + '/*');
});

gulp.task('assets', function(){
	let dests = [];

	for (let i = 0; i < dests.length; i++){
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
	let dests = [],
		vendorsDeps = [];

	for (let i = 0; i < paths.sections.length; i++){
		dests.push(paths.sections[i].srcPath.slice(0,-1) + 'json');
	}

	return gulp.src(dests)//, {base: sectionsPathsKeys[i]}
		.pipe(jsonTransform(function(data) {
			vendorsDeps.push({
				dir: data.vendorDependencies.baseDir,
				names:[]
			});

			for (let i = 0; i < data.vendorDependencies.modules.css.length; i++){
				vendorsDeps[vendorsDeps.length - 1].names.push(data.vendorDependencies.modules.css[i]);
			}

			return vendorsDeps;
		}))

		.on('data',function(file){
			console.log(file.path);

			console.log(vendorsDeps);
		})

		//.pipe(concat('vendor.css'))
		//.pipe(cssnano())

		.on('data',function(file){
			console.log(file.path);
		})

		.pipe(gulp.dest(dist));


});

gulp.task('styles:customs', function() {
	let dests = [];

	for (let i = 0; i < paths.sections.length; i++){
		dests.push(paths.sections[i].srcPath.slice(0,-1) + `{${typesPostfixes.css.join(',')}}`);
	}

	return gulp.src(dests, {base:'front'})
		.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(concat('customs.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(rename(function(filepath) {
			for (let i = 0; i < paths.sections.length; i++){
				console.log(filepath);
				let pathSection = paths.sections.find(x => filepath.dirname.indexOf(x.base) > -1);
				console.log(pathSection);//neesd two renames
				if (pathSection){
					console.log(path.join(pathSection.base, 'styles'));
					return filepath.dirname = path.join(pathSection.base, 'styles');
				}
			}
		}))
		.pipe(gulp.dest(dist));
});

gulp.task('styles', gulp.parallel('styles:vendors'));

// The default task (called when you run `gulp` from cli)
gulp.task('default', gulp.series('clean', 'assets'));