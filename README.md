# Elliptical Gulp

## Gulp Task Api

```bash
# variables
var config=require('./config.json');
var Tasks=require('elliptical-gulp');
var gulp=require('gulp');

# task object
var tasks=new Tasks(config);

```

## Example Gulpfile Using the Api

``` bash

# start live server
gulp.task('start-live-server',function(){
    tasks.startLiveServer();
});

# start dev server
gulp.task('start-server',function(){
    tasks.startServer();
});

# start live server, watch scripts, watch sass
gulp.task('start-live',function(){
    tasks.startLive();
});

# start dev server, watch scripts, watch sass
gulp.task('start',function(){
    tasks.start();
});

# start live server, watch javascript app, watch sass
gulp.task('start-live-app',function(){
    tasks.startLiveApp();
});

# start dev server, watch javascript app, watch sass
gulp.task('start-app',function(){
    tasks.startApp();
});


# start live server, watch sass
gulp.task('start-live-sass',function(){
    tasks.startLiveSass();
});


# start dev server, watch sass
gulp.task('start-sass',function(){
    tasks.startSass();
});


# start live server, watch app only
gulp.task('start-live-app-no-sass',function(){
    tasks.startLiveAppNoSass();
});

# start dev server, watch app only
gulp.task('start-app-no-sass',function(){
    tasks.startAppNoSass();
});

# start live server, watch scripts only
gulp.task('start-live-scripts',function(){
    tasks.startLiveScripts();
});

# start dev server, watch scripts only
gulp.task('start-scripts',function(){
    tasks.startScripts();
});


# one-time sass compile
gulp.task('sass-compile', function () {
    tasks.sassCompile();
});

# watch sass
gulp.task('sass-watch', function () {
    tasks.sassWatch();
});

# watch scripts
gulp.task('scripts-watch', function () {
    tasks.scriptsWatch();
});

# build scripts
gulp.task('scripts-build', function () {
    tasks.scriptsBuild();
});

# watch javascript app
gulp.task('app-watch', function () {
    tasks.appWatch();
});

# build javascript app
gulp.task('app-build', function () {
    tasks.appBuild();
});

# vulcanize html imports
gulp.task('vulcanize', function () {
    tasks.vulcanize();
});

# build html imports file for the javascript app files
gulp.task('app-build-imports', function () {
    tasks.appBuildImports();
});


# watch the javascript app to build the app html imports file
gulp.task('app-watch-imports', function () {
    tasks.appWatchImports();
});

# watch sass and the javascript app to build the app html imports file
gulp.task('watch', function () {
    tasks.watch();
});

```


## Config.json File

elliptical gulp relies on a config json in the task root. This file should expose the following properties.

``` bash
# json file props

# path to sass app file
sassApp

# sass src files path
sassSrc

# css destination path
cssDest

# dev server root path
devPath

# dev server port
devPort

# live server port
livePort

# live server root path
livePath

# live host
liveHost

# app scripts pah
appScriptPath

# scripts src path
scriptSrc

# scripts dest path
scriptDest

# html imports src path
importSrc

# vulcanized dest path
vulcanDest

# strip excludes from vulcanized file
stripExcludes

# inline scripts in vulcanized file
inlineScripts


```

