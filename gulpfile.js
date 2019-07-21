// Initialize modeules

const { src , dest, watch, series, parallel } = require('gulp');

// importing all gulp files
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

// Files paths
const files = {
    scssPath: 'app/scss/**/*scss',
    jsPath: 'app/js/**/*.js',
}

// Sass task
function scssTask(){
    return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
}

// export task
exports.scssTask = series(
    parallel(scssTask)
);