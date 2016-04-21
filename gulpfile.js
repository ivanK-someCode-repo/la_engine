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
//for tasks correct processing repaired by IDE files when restore files in IDE use gulp-cached
const concatCss = require('gulp-concat-css');
const log = require('gulp-filelog');
const newer = require('gulp-newer');
const remember = require('gulp-remember');
const rev = require('gulp-rev');
const browsersync = require('browser-sync').create();
const through2 = require('through2');
//npm install -g "gulpjs/gulp-cli#4.0"
const path = require('path');
const fs = require('fs');

const DIST = 'www';
const SRC_BASE = 'front';
const BOWER_SCR = 'bower_components';
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('clean', function() {
	return del(DIST + '/*');
});

gulp.task('assets', function(){
	return gulp.src(`./${SRC_BASE}/**/*.{${['png', 'svg', 'ico'].join(',')}}`, {since: gulp.lastRun('assets')})
			//.pipe(debug({title:'assets'}))
		.pipe(newer(path.join(DIST, 'customs'))) //check files change date
			//.pipe(debug({title:'assets'}))
		.pipe(rename(function(filepath) {
			return filepath.dirname = path.join(filepath.dirname.split(path.sep)[0], 'assets');
			}))
		.pipe(gulp.dest(path.join(DIST, 'customs')));
});

gulp.task('styles:vendor', function() {
	return	gulp.src(`./${BOWER_SCR}/**/!(*.*|*-*).css`, {since: gulp.lastRun('styles:vendor')})
					//.pipe(debug({title:'st_vendor'}))
				.pipe(newer(path.join(DIST, 'vendor')))
					//.pipe(debug({title:'st_vendor'}))
				.pipe(rename(function(filepath) {
					return filepath.dirname = '.';// = path.join(filepath.dirname.split(path.sep)[0]);
				}))
				.pipe(cssnano())
				.pipe(gulp.dest(path.join(DIST, 'vendor')));
});

gulp.task('styles:customs', function(callback) {
	const projectSectionsNames = fs.readdirSync(`./${SRC_BASE}`);

	for (let i = 0; i < projectSectionsNames.length; i++){
		gulp.src(`./${path.join(SRC_BASE, projectSectionsNames[i])}/**/*.less`, {since: gulp.lastRun('styles:customs')})
				//.pipe(debug({title:'st_customs'}))
			.pipe(newer(path.join(DIST, 'customs')))
				//.pipe(debug({title:'st_customs'}))
			.pipe(remember(`styles:customs:${i}`)) //add to stream files that where been ignored by gulp.lastRun
			.pipe(gulpIf(isDevelopment, sourcemaps.init()))
				.pipe(less())
				.pipe(concatCss(path.join(projectSectionsNames[i], 'main.css')))
			.pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
			.pipe(cssnano())
			.pipe(gulp.dest(path.join(DIST, 'customs')))
		.pipe(rev.manifest('css'+i+'.json'))
		.pipe(gulp.dest('./manifest'));
	}

	callback();
});

//gulp.task('styles', gulp.parallel('styles:vendors', 'styles:customs'));

// The default task (called when you run `gulp` from cli)
gulp.task('build', gulp.series(
						'clean',
						gulp.parallel('styles:customs', 'styles:vendor', 'assets')));

gulp.task('watch', function(){
	gulp.watch(`./${SRC_BASE}/**/*.less`, gulp.series('styles:customs')).on('unlink', function(filepath){
		console.log("wtch stl cust");
		const projectSectionsNames = fs.readdirSync(`./${SRC_BASE}`);

		console.log(projectSectionsNames);
		console.log(path.resolve(filepath));

		for (let i=0; i<projectSectionsNames.length; i++){
			console.log(remember.cacheFor(`styles:customs:${i}`));
			remember.forget(`styles:customs:${i}`, path.resolve(filepath));
		}
	});

	gulp.watch(`./${BOWER_SCR}/**/*.css`, gulp.series('styles:vendor'));

	gulp.watch(`./${SRC_BASE}/**/*.{${['png', 'svg', 'ico'].join(',')}}`, gulp.series('assets'));
});

gulp.task('serve', function(){
	browsersync.init({
		proxy: 'localhost:3000'
	});

	browsersync.watch(`./${BOWER_SCR}/**/*.*`).on('change', browsersync.reload);
});

gulp.task('default', gulp.series(
							'build',
							gulp.parallel('watch')));//, 'serve'