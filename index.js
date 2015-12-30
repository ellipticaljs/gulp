var gulp=require('gulp'),
    http = require('http'),
    ecstatic = require('elliptical-ecstatic'),
    sass = require('gulp-sass'),
    liveServer = require("live-server"),
    watch=require('gulp-watch'),
    concat=require('gulp-concat');



var tasks={};

tasks.default=function(){
    console.log('elliptical prototype projects. Tasks: start-live|start|start-app|start-live-app|start-live-sass|start-sass|sass-compile|sass-watch|scripts-watch|app-watch|app-build|components-build');
};

tasks.startLive=function(config){
    //start server
    startLiveServer({
        port:config.livePort,
        path:config.path,
        host:config.liveHost
    });

    //watch scripts
    watchScripts();

    //watch sass
    watchSass();
};

tasks.start=function(config){
    //start server
    var path=config.path;
    path=path.replace('.','');
    startEcstaticServer({
        port:config.port,
        path:path
    });

    //watch scripts
    watchScripts();

    //watch sass
    watchSass();
};

tasks.startLiveApp=function(config){
    //start server
    startLiveServer({
        port:config.livePort,
        path:config.path,
        host:config.liveHost
    });

    //watch app
    watchApp();

    //watch sass
    watchSass();
};

tasks.startApp=function(config){
    //start server
    var path=config.path;
    path=path.replace('.','');
    startEcstaticServer({
        port:config.port,
        path:path
    });

    //watch app
    watchApp();

    //watch sass
    watchSass();
};

tasks.startLiveSass=function(config){
    //start server
    startLiveServer({
        port:config.livePort,
        path:config.path,
        host:config.liveHost
    });

    //watch sass
    watchSass();
};

tasks.startSass=function(config){
    //start server
    var path=config.path;
    path=path.replace('.','');
    startEcstaticServer({
        port:config.port,
        path:path
    });


    //watch sass
    watchSass();
};

tasks.sassCompile=function(config){
    compileSass(config.path);
};

tasks.sassWatch=function(){
    watchSass();
};

tasks.scriptsWatch=function(){
    watchScripts();
};

tasks.appWatch=function(){
    watchApp();
};

tasks.appBuild=function(){
    buildApp();
};

tasks.componentsBuild=function(){
    moveElements();
};


///private
function startLiveServer(opts){
    var params={
        port:opts.port,
        host:opts.host,
        root:opts.path,
        noBrowser:true
    };
    liveServer.start(params);
}

function startEcstaticServer(opts){
    var path=__dirname + opts.path;
    console.log(path);
    http.createServer(
        ecstatic({ root: path })
    ).listen(opts.port);
}

function compileSass(config){
    gulp.src('./app.scss')
        .pipe(sass())
        .pipe(gulp.dest(config.path + '/css'));
}

function watchScripts(config){
    watch(config.src,function(files){
        concatScripts();
    });
}

function watchSass(){
    var src='./sass/**/*.scss';
    watch(src,function(files){
        compileSass();
    });
}

function buildApp(){
    gulp.src(['./app/middleware/**/*.js','./app/app.js','./app/providers/**/*.js','./app/services/**/*.js',
            './app/modules/**/*.js','./app/controllers/**/*.js','./app/bindings/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/scripts'));
}

function watchApp(config){
    watch(config.src,function(files){
        buildApp();
    });
}

function moveElements(){
    gulp.src('./public/elements/**/*.*')
        .pipe(gulp.dest('./public/components'));
}


function concatScripts(config){
    var src=config.src;
    var dest=config.dest;
    var destFile=config.destFile;
    gulp.src(src)
        .pipe(concat(destFile))
        .pipe(gulp.dest(dest));
}

module.exports=function Tasks(config){
    this.default=tasks.default();
    this.startLive=tasks.startLive(config);
    this.start=tasks.start(config);
    this.startLiveApp=tasks.startLiveApp(config);
    this.startApp=tasks.startApp(config);
    this.startLiveSass=tasks.startLiveSass(config);
    this.startSass=tasks.startSass(config);
    this.sassCompile=tasks.sassCompile(config);
    this.sassWatch=tasks.sassWatch();
    this.scriptsWatch=tasks.scriptsWatch();
    this.appWatch=tasks.appWatch();
    this.appBuild=tasks.appBuild();
    this.componentsBuild=tasks.componentsBuild();
};