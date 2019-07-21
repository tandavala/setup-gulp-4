// Initialize modeules

const { gulp, src , dest, watch, series, parallel } = require('gulp');

// importing all gulp files
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
var replace = require('gulp-replace');


// Files paths
const files = {
    nodePath: 'node_modules',
    scssPath: 'app/scss/**/*scss',
    jsPath: 'app/js/**/*.js',
}

// Vendor JS task

function vendorJS(){
    return src([
        files.nodePath + '/jquery-slim/dist/jquery.slim.js',
        files.nodePath + '/bootstrap/dist/js/bootstrap.bundle.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor-scripts.js'))
    .pipe(dest('dist'))
    .pipe(uglify().on('error', function(err){
        console.log(err);
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
}

// Vendor JS task

function vendorCSS(){
    return src([
        
        files.nodePath + '/font-awesome/scss/font-awesome.scss',
        files.nodePath + '/bootstrap/scss/bootstrap.scss',
        files.scssPath,
        
    ])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(concat('vendor.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
}

// Sass task
function scssTask(){
    return src([files.nodePath + '/bootstrap/scss/bootstrap.scss', files.scssPath])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
}

// Js task

function jsTask(){
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist')
    );
}

/** converting es6 to es5  */
function es6Task(){
    return src([
        files.jsPath
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('custom.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
}

// export task
exports.scssTask = series(
    parallel(scssTask)
);

// export js task

exports.jsTask = series(
    parallel(jsTask)
);

exports.es6Task = series(
    parallel(es6Task)
);

// export vendor js
exports.vendorJS = series(
    parallel(vendorJS)
)
// export vendor js
exports.vendorCSS = series(
    parallel(vendorCSS)
)