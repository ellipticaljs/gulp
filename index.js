var gulp=require('gulp'),
    http = require('http'),
    ecstatic = require('elliptical-ecstatic'),
    sass = require('gulp-sass'),
    liveServer = require("live-server"),
    watch=require('gulp-watch'),
    concat=require('gulp-concat'),
    vulcanize = require('gulp-vulcanize'),
    inject = require('gulp-inject'),
    minifyInline=require('gulp-minify-inline');


var tasks={};
var _config;

tasks.default=function(){
    var _tasks='elliptical gulp tasks: ';
    _tasks+='start-live-server|start-server|start-live|start|start-app|start-live-app|';
    _tasks+='start-live-sass|start-sass|start-live-app-no-sass|start-app-no-sass|start-live-scripts|start-scripts|';
    _tasks+='sass-compile|sass-watch|scripts-watch|app-watch|app-build|scripts-build|';
    _tasks+= 'app-watch-imports|app-build-imports|';
    _tasks+='app-scaffold|vulcanize|vulcanize-min';

    console.log(_tasks);
};

tasks.startLiveServer=function(config){

    //start live server
    startLiveServer({
        port:config.livePort,
        path:config.livePath,
        host:config.liveHost
    });
};

tasks.startServer=function(config){
    //start server
    var path=config.devPath;
    path=path.replace('.','');
    startEcstaticServer({
        port:config.devPort,
        path:path
    });

};

tasks.startLive=function(config){

    //start server
    startLiveServer({
        port:config.livePort,
        path:config.livePath,
        host:config.liveHost
    });

    //watch scripts
    watchScripts(config);

    //watch sass
    watchSass(config);
};

tasks.start=function(config){
    //start server
    var path=config.devPath;
    path=path.replace('.','');
    startEcstaticServer({
        port:config.devPort,
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
        path:config.livePath,
        host:config.liveHost
    });

    //watch app
    watchAppImports(config);

    //watch sass
    watchSass(config);
};

tasks.startApp=function(config){
    //start server
    var path=config.devPath;
    path=path.replace('.','');
    startEcstaticServer({
        port:config.devPort,
        path:path
    });

    //watch app
    watchAppImports(config);

    //watch sass
    watchSass(config);
};

tasks.startLiveSass=function(config){
    //start server
    startLiveServer({
        port:config.livePort,
        path:config.livePath,
        host:config.liveHost
    });

    //watch sass
    watchSass(config);
};

tasks.startSass=function(config){
    //start server
    var path=config.devPath;
    path=path.replace('.','');
    startEcstaticServer({
        port:config.devPort,
        path:path
    });


    //watch sass
    watchSass(config);
};

tasks.startLiveAppNoSass=function(config){
    //start server
    startLiveServer({
        port:config.livePort,
        path:config.livePath,
        host:config.liveHost
    });

    //watch app
    watchApp(config);
};

tasks.startAppNoSass=function(config){
    //start server
    var path=config.devPath;
    path=path.replace('.','');
    startEcstaticServer({
        port:config.devPort,
        path:path
    });

    //watch app
    watchApp(config);
};

tasks.startLiveScripts=function(config){
    //start server
    startLiveServer({
        port:config.livePort,
        path:config.livePath,
        host:config.liveHost
    });

    //watch scripts
    watchScripts(config);
};

tasks.startScripts=function(config){
    //start server
    var path=config.devPath;
    path=path.replace('.','');
    startEcstaticServer({
        port:config.devPort,
        path:path
    });

    //watch scripts
    watchScripts(config);
};


tasks.sassCompile=function(config){
    compileSass(config);
};

tasks.sassWatch=function(config){
    watchSass(config);
};

tasks.scriptsWatch=function(config){
    watchScripts(config);
};

tasks.appWatch=function(config){
    watchApp(config);
};

tasks.appBuild=function(config){
    buildApp(config);
};

tasks.scriptsBuild=function(config){
    concatScripts(config);
};

tasks.vulcanize=function(config){
    vulcanizeImportFile(config);
};

tasks.vulcanizeMin=function(config){
    vulcanizeAndMinifyImportFile(config);
};

tasks.appBuildImports=function(config){
    writeAppImports(config);
};

tasks.appWatchImports=function(config){
    watchAppImports(config);
};

tasks.watch=function(config){
    watchSassAndImports(config);
};

tasks.appScaffold=function(config){
    scaffoldApp(config);
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
    http.createServer(
        ecstatic({ root: path })
    ).listen(opts.port);
}

function compileSass(config){
    gulp.src(config.sassApp)
        .pipe(sass())
        .pipe(gulp.dest(config.cssDest));
}

function watchScripts(config){
    watch(config.scriptSrc,function(files){
        concatScripts(config);
    });
}

function watchSass(config){
    watch(config.sassSrc,function(files){
        compileSass(config);
    });
}

function getAppSrcArray(){
    var root=_config.appScriptPath;
    return [root + '/middleware/**/*.js',root + '/app.js',root + '/providers/**/*.js',root + '/services/**/*.js',
        root + '/modules/**/*.js',root + '/controllers/**/*.js',root + '/bindings/**/*.js']
}

function buildApp(config){
    gulp.src(getAppSrcArray())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.scriptDest));
}

function watchApp(config){
    watch(config.scriptSrc,function(files){
        buildApp(config);
    });
}

function watchAppImports(config){
    watch(config.scriptSrc,function(files){
        writeAppImports(config);
    });
}

function watchSassAndImports(config){
    watchSass(config);
    watchAppImports(config);
}

function concatScripts(config){
    var src=config.scriptSrc;
    var dest=config.scriptDest;
    gulp.src(src)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest));
}

function vulcanizeImportFile(config){
    return gulp.src(config.importSrc + '/import.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: config.stripExcludes,
            inlineScripts: config.inlineScripts
        }))
        .pipe(gulp.dest(config.vulcanDest));
}

function writeAppImports(config){
    var src=getAppSrcArray();
    var target = gulp.src(config.importSrc + '/app.html');
    var sources = gulp.src(src, {read: false});
    return target.pipe(inject(sources,{relative:true}))
        .pipe(gulp.dest(config.importSrc));
}

function scaffoldApp(config){
    gulp.src('./node_modules/elliptical-gulp/templates/app/**/*.*')
        .pipe(gulp.dest(config.appPath));
}

function vulcanizeAndMinifyImportFile(config){
    return gulp.src(config.vulcanDest + "/import.html")
        .pipe(minifyInline())
        .pipe(gulp.dest(config.vulcanDest));
}


module.exports=function Tasks(config){
    this.config=config;
    _config=config;

    this.default=function(){
        tasks.default(this.config);
    };
    this.startLiveServer=function(){
        tasks.startLiveServer(this.config);
    };
    this.startServer=function(){
        tasks.startServer(this.config);
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
    this.startLiveAppNoSass=function(){
        tasks.startLiveAppNoSass(this.config);
    };
    this.startAppNoSass=function(){
        tasks.startAppNoSass(this.config);
    };
    this.startLiveScripts=function(){
        tasks.startLiveScripts(this.config);
    };
    this.startScripts=function(){
        tasks.startScripts(this.config);
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
        tasks.appBuild(this.config);
    };
    this.scriptsBuild=function(){
        tasks.scriptsBuild(this.config);
    };
    this.vulcanize=function(){
        tasks.vulcanize(this.config);
    };
    this.vulcanizeMin=function(){
        tasks.vulcanizeMin(config);
    };
    this.appBuildImports=function(){
        tasks.appBuildImports(this.config);
    };
    this.appWatchImports=function(){
        tasks.appWatchImports(this.config);
    };
    this.watch=function(){
        tasks.watch(this.config);
    };
    this.appScaffold=function(){
        tasks.appScaffold(config);
    };
    this.appSrcArray=function(){
        return getAppSrcArray();
    };
};