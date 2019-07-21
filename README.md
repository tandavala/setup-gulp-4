# Setup Gulp 4

gulp is an open source JavaScript toolkit created by Eric Schoffstall used as a system for creating continuous flow in front-end web developmen.

# Setu up

Before you run Gulp, you will need to install a couple of things:

[*] Install [Node.js](https://nodejs.org/en/) if you don't you it yet
[*] Install [Gulp Command Line](https://www.npmjs.com/package/gulp-cli) by running ```npm install -g gulp-cli ```

# The struture of our project

[*] index.html &mdash; our main html file
[*] package.json &mdash; contains all the npm packages to install you run ```npm install```
[*] gulpfile.js &mdash; contains the confif and runs all the gulp task
[*] /app &mdash; working folder, you will edit your scss and js file here
[*] /dist &mdash; gulp will output files here, do **not change this**.

# How it works

App directory is your working directory here yo will code you scss and js, gulp will convert you scss to normall css and put in dist directory the same will happen with javascript for exemple if you intent to use es6. For more about gulp refer to its docs [here](https://gulpjs.com/docs/en/getting-started/quick-start).