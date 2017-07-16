/// <binding AfterBuild='default' Clean='clean' />
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var babelminify = require('gulp-babel-minify');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var filesToWatch = [
    "src/sass/*.scss",
    "src/js/*.js",
    "Components/**/*.scss",
    "Components/**/*.js"
];

var filesToClean = [
    "dist/css/tiborixd.css",
    "dist/css/tiborixd.css.map",
    "dist/js/tiborixd.js",
    "dist/js/tiborixd.js.map",
];

gulp.task('default', ['js', 'scss']);

gulp.task('clean', function () {
    return gulp
        .src(filesToClean, { read: false })
        .pipe(rimraf({ force: true }));
});

gulp.task('js', function () {
    console.log('js');
   
    return gulp
        .src([//'App/js/HtmlExtensions.js', 'App/js/stringUtil.js', 'App/js/fileLoader.js', 'App/js/dateUtil.js', 
        'src/js/styleHelper.js', 'Components/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('tiborIxD.js'))
        .pipe(babel({ presets: ['es2015'] }))
        //.pipe(babelminify({unsafe:false}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scss', function () {
    console.log('scss');

    return gulp
        .src('src/sass/tiBorIxD.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle :'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch(filesToWatch, ['js', 'scss']);
});

