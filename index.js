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
    watchScripts(config);

    //watch sass
    watchSass(config);
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
    watchScripts(config);

    //watch sass
    watchSass(config);
};

tasks.startLiveApp=function(config){
    //start server
    startLiveServer({
        port:config.livePort,
        path:config.path,
        host:config.liveHost
    });

    //watch app
    watchApp(config);

    //watch sass
    watchSass(config);
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
    watchApp(config);

    //watch sass
    watchSass(config);
};

tasks.startLiveSass=function(config){
    //start server
    startLiveServer({
        port:config.livePort,
        path:config.path,
        host:config.liveHost
    });

    //watch sass
    watchSass(config);
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
    watchSass(config);
};

tasks.sassCompile=function(config){
    compileSass(config.path);
};

tasks.sassWatch=function(config){
    watchSass(config);
};

tasks.scriptsWatch=function(config){
    watchScripts(config);
};

tasks.appWatch=function(config){
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
        concatScripts(config);
    });
}

function watchSass(config){
    var src='./sass/**/*.scss';
    watch(src,function(files){
        compileSass(config);
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
    this.config=config;
    this.default=function(){
        tasks.default();
    };
    this.startLive=function(){
        tasks.startLive(this.config);
    };
    this.start=function(){
        tasks.start(this.config);
    };
    this.startLiveApp=function(){
        tasks.startLiveApp(this.config);
    };
    this.startApp=function(){
        tasks.startApp(this.config);
    };
    this.startLiveSass=function(){
        tasks.startLiveSass(this.config);
    };
    this.startSass=function(){
        tasks.startSass(this.config);
    };
    this.sassCompile=function(){
        tasks.sassCompile(this.config);
    };
    this.sassWatch=function(){
        tasks.sassWatch(this.config);
    };
    this.scriptsWatch=function(){
        tasks.scriptsWatch(this.config);
    };
    this.appWatch=function(){
        tasks.appWatch(this.config);
    };
    this.appBuild=function(){
        tasks.appBuild();
    };
    this.componentsBuild=function(){
        tasks.componentsBuild();
    };
};