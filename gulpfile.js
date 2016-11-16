
'use strict';

// -------------------------------------
//   devDependencies
// -------------------------------------

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');

// --------------------------------------------
//  Error message
// --------------------------------------------

const onError = function(err) {
	notify.onError({
		title: "Gulp",
		subtitle: "FAIL!!!",
		message: "Error: <%= error.message %>",
		sound: "Beep"
	})(err);
	this.emit('end');
};

// --------------------------------------------
//  Task: compile, minify, autoprefix sass/scss
// --------------------------------------------
gulp.task('styles', function() {
	return gulp.src('style/*.{sass,scss}')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			browsers: ['last 5 versions', 'ie 8', 'ie 9', '> 1%'],
			cascade: false
		}))
		.pipe(gulp.dest('style/'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('style/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// --------------------------------------------
//  Task: Watch
// --------------------------------------------

gulp.task('watch', function() {
	gulp.watch('style/**/*.scss', gulp.series('styles'));
});

gulp.task('clean', function() {
	return del('public');
});
// --------------------------------------------
//  Task: Build
// --------------------------------------------

gulp.task('build', gulp.series(
	'clean',
	gulp.parallel('styles')));

// --------------------------------------------
//  Task: Basic server
// --------------------------------------------

gulp.task('server', function() {
	browserSync.init({
		server: true
	});
});

// --------------------------------------------
//  Task: Development
// --------------------------------------------

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'server'))
);