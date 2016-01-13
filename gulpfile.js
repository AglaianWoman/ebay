var gulp = require("gulp"),
	babel = require("gulp-babel"),
	less = require('gulp-less'),
	concatCss = require('gulp-concat-css'),
	cssnano = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch');


gulp.task('react', function () {
	return gulp.src('./build/jsx/*.jsx')
		.pipe(babel())
		.pipe(gulp.dest('./build/js'));
});

gulp.task('less', function () {
	return gulp.src('./build/less/styles.less')
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
});

gulp.task('connect', function () {
	connect.server({
		livereload: true,
		port: 8888
	});
});

gulp.task('scripts:dev', ['react'], function () {
	return gulp.src([
			'./build/js/lib/react.js',
			'./build/js/lib/react-dom.js',
			'./build/js/lib/*.js',
			'!./build/js/lib/react.min.js',
			'!./build/js/lib/react-dom.min.js',
			'./build/js/*.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(connect.reload());
});

gulp.task('scripts:prod', ['react'], function () {
	return gulp.src([
			'./build/js/lib/react.min.js',
			'./build/js/lib/react-dom.min.js',
			'./build/js/lib/*.js',
			'!./build/js/lib/react.js',
			'!./build/js/lib/react-dom.js',
			'./build/js/*.js'
		])
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function () {
	gulp.watch('./build/less/*.less', ['less']);
	gulp.watch(['./build/js/*.js', './build/jsx/*.jsx'], ['scripts:dev']);
});

gulp.task('default', ['less', 'scripts:dev', 'watch', 'connect']);

gulp.task('deploy', ['less', 'scripts:prod']);
