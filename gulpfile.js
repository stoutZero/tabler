const gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    rtlcss = require('gulp-rtlcss'),
    pckg = require('./package.json'),
    webpack = require('webpack-stream');

gulp.task('styles', function () {
    return gulp.src('src/assets/scss/tabler.scss', { base: '.' })
        .pipe(sass({
            precision: 8,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: pckg.browserslist,
            cascade: false
        }))
        .pipe(rename('dashboard.css'))
        .pipe(gulp.dest('src/assets/css/'))

        .pipe(rtlcss())
        .pipe(rename('dashboard.rtl.css'))
        .pipe(gulp.dest('src/assets/css/'));
});

gulp.task('styles-plugins', function () {
    return gulp.src('src/assets/plugins/**/plugin.scss', { base: '.' })
        .pipe(sass({
            precision: 6,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: pckg.browserslist,
            cascade: false
        }))
        .pipe(rename(function(path) {
            path.extname = '.css';
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('copy-assets', function () {
	const prefix = 'assets';
	const suffix = '**/*';
	const outputPrefix = 'public/assets';

	gulp.src([`${prefix}/fonts/${suffix}`])
		.pipe(gulp.dest(`${outputPrefix}/fonts`));
	gulp.src([`${prefix}/images/${suffix}`])
		.pipe(gulp.dest(`${outputPrefix}/images`));
	gulp.src([`${prefix}/plugins/${suffix}`])
		.pipe(gulp.dest(`${outputPrefix}/plugins`));
});

gulp.task('scripts', function () {
});

gulp.task('watch', ['styles', 'styles-plugins', 'copy-assets'], function() {
    gulp.watch('src/assets/scss/**/*.scss', ['styles']);
    gulp.watch('src/assets/plugins/**/*.scss', ['styles-plugins']);
});

gulp.task('build', ['styles', 'styles-plugins', 'copy-assets']);

gulp.task('default', ['build']);
