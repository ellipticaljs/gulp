
var config=require('./config.json');
var Tasks=require('elliptical-gulp');
var gulp=require('gulp');


var tasks=new Tasks(config);



gulp.task('default',function(){
    tasks.default();
});

gulp.task('start-server',function(){
    tasks.startServer();
});

gulp.task('start',function(){
    tasks.start();
});

gulp.task('start-app',function(){
    tasks.startApp();
});

gulp.task('start-app-no-sass',function(){
    tasks.startAppNoSass();
});

gulp.task('sass-compile', function () {
    tasks.sassCompile();
});

gulp.task('sass-watch', function () {
    tasks.sassWatch();
});

gulp.task('app-watch', function () {
    tasks.appWatch();
});

gulp.task('app-build', function () {
    tasks.appBuild();
});

gulp.task('app-imports', function () {
    tasks.appImports();
});

gulp.task('app-scaffold', function () {
    tasks.appImports();
});

gulp.task('watch', function () {
    tasks.watch();
});

gulp.task('app-clean', function () {
    tasks.appClean();
});

gulp.task('vulcanize', function () {
    tasks.vulcanize();
});

gulp.task('vulcanize-min', function () {
    tasks.vulcanizeMin();
});

gulp.task('copy-config', function () {
    tasks.copyConfig();
});




