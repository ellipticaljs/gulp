# Elliptical Gulp

## Elliptical Gulp Task Api

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

# start live server only
gulp.task('start-server',function(){
    tasks.startServer();
});

# start server, watch sass
gulp.task('start',function(){
    tasks.start();
});

# start server, watch sass, watch app
gulp.task('start-app',function(){
    tasks.startApp();
});

# start server, watch app only
gulp.task('start-app-no-sass',function(){
    tasks.startAppNoSass();
});

# compile sass
gulp.task('sass-compile', function () {
    tasks.sassCompile();
});

# watch sass
gulp.task('sass-watch', function () {
    tasks.sassWatch();
});

# watch app
gulp.task('app-watch', function () {
    tasks.appWatch();
});

# build app(babel transpile)
gulp.task('app-build', function () {
    tasks.appBuild();
});

# build app html imports only
gulp.task('app-imports', function () {
    tasks.appImports();
});

# scaffold a new app skeleton
gulp.task('app-scaffold', function () {
    tasks.appImports();
});

# watch sass, watch app
gulp.task('watch', function () {
    tasks.watch();
});

# clean the transpiled bin directory
gulp.task('app-clean', function () {
    tasks.appClean();
});

# vulcanize html imports
gulp.task('vulcanize', function () {
    tasks.vulcanize();
});

# min vulcanized file
gulp.task('vulcanize-min', function () {
    tasks.vulcanizeMin();
});

# copy default config file,.babelrc to project root
gulp.task('copy-config', function () {
    tasks.copyConfig();
});



```

## es2015,es7 supported presets and plugins

### es2015 presets
### stage-3 presets
### es2015 module plugin
### legacy decorators plugin




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

# app src scripts pah
appScriptPath

# app bin output path
binScriptPath

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

# inline css in vulcanized file
inlineCss


```

