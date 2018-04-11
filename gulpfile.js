const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const rtlcss = require('gulp-rtlcss')
const pckg = require('./package.json')
const webpack = require('webpack-stream')
const path = require('path')
const MinifyPlugin = require("babel-minify-webpack-plugin")
const isDev = process.env.NODE_ENV !== 'production'

gulp.task('styles', function () {
	const outputStyle = isDev ? 'expanded' : 'compressed';

	return gulp.src('assets/scss/tabler.scss', { base: '.' })
		.pipe(sass({
			precision: 8,
			outputStyle: outputStyle,
			importer: require('node-sass-importer'),
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: pckg.browserslist,
			cascade: false
		}))
		.pipe(rename('tabler.css'))
		.pipe(gulp.dest(path.resolve('src/assets/css')))

		.pipe(rtlcss())
		.pipe(rename('tabler.rtl.css'))
		.pipe(gulp.dest(path.resolve('src/assets/css')))
	;
});

gulp.task('copy-assets', function () {
	const prefix = 'assets';
	const suffix = '**/*';
	const outputPrefix = 'public/assets';

	gulp.src([`${prefix}/fonts/${suffix}`])
		.pipe(gulp.dest(`${outputPrefix}/fonts`))

	gulp.src([`${prefix}/images/${suffix}`])
		.pipe(gulp.dest(`${outputPrefix}/images`))

	return gulp.src([`${prefix}/js/{core,tabler}.js`])
		.pipe(gulp.dest(`${outputPrefix}/js`));
});

gulp.task('vendor-scripts', function () {
	const plugins = !isDev ? [new MinifyPlugin()] : [];
	return gulp.src('assets/js/vendor.js')
		.pipe(webpack({
			module: {
				rules: [{
					test: require.resolve('jquery'),
					use: [{
						loader: 'expose-loader',
						options: '$'
					}]
				}]
			},
			output: {
				path: path.resolve('public/assets/js'),
				filename: 'vendor.js'
			},
			plugins: plugins,
		}))
		.pipe(gulp.dest('src/assets/js'));
});

gulp.task(
	'watch',
	['copy-assets', 'styles', 'vendor-scripts'],
	function () {
		gulp.watch('assets/scss/**/*.scss', ['styles']);
		gulp.watch('assets/js/**/*.js', ['vendor-scripts']);
	}
);

gulp.task('build', ['copy-assets', 'styles', 'vendor-scripts']);

gulp.task('default', ['build']);
