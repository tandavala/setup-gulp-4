# Setup Gulp 4

gulp is an open source JavaScript toolkit created by Eric Schoffstall used as a system for creating continuous flow in front-end web developmen.

# Setu up

Before you run Gulp, you will need to install a couple of things:

- Install [Node.js](https://nodejs.org/en/) if you don't you it yet
- Install [Gulp Command Line](https://www.npmjs.com/package/gulp-cli) by running ```npm install -g gulp-cli ```

# The struture of our project

- index.html &mdash; our main html file
- package.json &mdash; contains all the npm packages to install you run ```npm install```
- gulpfile.js &mdash; contains the confif and runs all the gulp task
- /app &mdash; working folder, you will edit your scss and js file here
- /dist &mdash; gulp will output files here, do **not change this**.

# How it works

App directory is your working directory here yo will code you scss and js, gulp will convert you scss to normall css and put in dist directory the same will happen with javascript for exemple if you intent to use es6. For more about gulp refer to its docs [here](https://gulpjs.com/docs/en/getting-started/quick-start).

# Preparing gulp file

Now open a ```gulpfile.js``` your editor add the follow line of code. but first you should now some terminologies dont worry i will explain all of them.

- ```src``` &mdash; this refer to the folder where you have your scss or js.
- ```dest``` &mdash; this refer to where you want gulp to save you normal css and js files.
- ```watch``` &mdash; this command will watch if you touch any file that you point it.

Gulp needs plugins bellow i will list some that i have used in this project.

- ```gulp-sourcemaps``` &mdash; maps the scss style back to the original scss file in the wen broswer dev tools.
- ```gulp-sass``` &mdash; runs autoprefixer and cssnano
- ```gulp-prostcss ``` &mdash; adds vendor prefixes to css like ```-webkit-```
- ```cssnano``` &mdash; minifies css

Js need too some puglins:
- ```gulp-concat``` &mdash; concatenates muilte js files into one file
- ```gulp-uglify`` &mdash; minifies js

For string replace we use:

- ```gulp-replace``` &mdash; add string parameter to css/js references for cache bust.

# Creating Tasks

a task in in gulp is basically a function that performs a specific porpose. so let's as we have setup every things now let's do the work. open your terminal in your root directory let us install our dependencies as bellow.
```bash
    npm install --save-dev autoprefixer cssnano gulp gulp-concat gulp-postcss gulp-replace gulp-sass gulp-sourcemaps gulp-uglify
```

to know more about our to install Node.js package with ```npm``` refere to this [tutorial](https://www.sitepoint.com/beginners-guide-node-package-manager/)

 Now we have all the plugin and gulp package in our machine let's do some coding. open you gulpfile.js and do the following.

```javascript
// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');

// Importing all gulp files
const souremaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');


// FIles paths
const files = {
    scssPath: 'app/scss/**/*scss', // getting all scss code we are writting
    jsPath: 'app/js/**/*.js' // getting all javascript code our writting
}
```
## Sass task

```javascript
    function scssTask(){
        return src(files.scessPath)
            .pipe(sourcemaps.init()) // initialize sourcemaps
            .pipe(sass()) // compile scss to css
            .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCss plugins
            .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
            .pipe(dest('dist')) // save the compiled scss to dist folder
    }
```

## JS task

```javascript
    function jsTask(){
        return src([
            files.jsPath
             // include all de vendor dependecies in sequency ( see my code in case of dout )
            ])
            .pipe(concat('all.js'))
            .pipe(uglify())
            .pipe(dest('dist'));

    }
```

## cache Bust task

```javascript
    var cbString = new Date().getTime();
    function cacheBustTask(){
        return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
    }
```
In the ```index.html``` file, i'm using the following references for css and 

Js files:

```html
    <link rel="stylesheet" href="dist/style.css?cb=123" >
    <script src="dist/all.js?cb=123"></script>
```

The reason that cache bust is helpful is because your browser and the web host server will often cache, or save, a copy of asset files like CSS and JS files. So when you load the same page again, it’s quicker for the browser to just load up those locally cached copies instead of having to re-download them from the server.

The problem is that sometimes you don’t want to load the old saved version. When you’ve made changes to your CSS or JS file and you redeploy to the server, you want to force people to re-download those files.

So one way to force the re-download is to add a little querystring 
 ?cb=123 to the end of those file references. If the browser reloads the page and the querystring is different from the last time, it will refresh the file.

I’m using the Gulp replace() function to look for strings containing “cb=” and any number. And replace that number with a new number made up of the current time converted to milliseconds since 1970.

That way every time Gulp runs, the querystring will be different and you’ll make sure that the new CSS and JS files get loaded in the user’s browser

## Watch task

```javascript
    function watchTask(){
        watch([files.scssPath, files.jsPath],
            parallel(sccssTask, jsTask));
    }
```

## Default task

This is the main Gulp task, which will automatically run if you type in ```gulp``` on the command line

```javascript
    // default task
    exports.default = series(
        parallel(scssTask, jsTask),
        cacheBustTask,
        watchTask
    );
```

```javascript
    // single task
    exports.jsTask = series(
        parallel(jsTask),
        watch
    );
```

Now the configuration and all the necessary code is done to run the tasks do the following.

- list tasks ```$ gulp --tasks```
- Run single task ``` $ gulp jsTask ```
- Run the default task ``` $ gulp ```

# Inspirations

- [coder coder website](https://coder-coder.com/gulp-4-walk-through/)
