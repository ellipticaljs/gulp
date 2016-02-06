var gulp=require('gulp'),
    http = require('http'),
    ecstatic = require('elliptical-ecstatic'),
    sass = require('gulp-sass'),
    liveServer = require("live-server"),
    watch=require('gulp-watch'),
    concat=require('gulp-concat'),
    vulcanize = require('gulp-vulcanize'),
    inject = require('gulp-inject');


var tasks={};
var _config;

tasks.default=function(){
    var _tasks='elliptical gulp tasks: start-live|start|start-app|start-live-app|';
    _tasks+='start-live-sass|start-sass|sass-compile|sass-watch|';
    _tasks+='scripts-watch|app-watch|app-build|vulcanize|app-imports-watch|write-app-imports|watch-app-imports'
    
    console.log(_tasks);
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
    watchApp(config);

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
    watchApp(config);

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
    watchApp(config);
};

tasks.appBuild=function(config){
    buildApp(config);
};

tasks.vulcanize=function(config){
    vulcanizeImportFile(config);
}

tasks.writeAppImports=function(config){
    writeAppImports(config);
}

tasks.watchAppImports=function(config){
    watchAppImports(config);
}

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
    var root=_config.ellipticalScriptPath;
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




module.exports=function Tasks(config){
    this.config=config;
    _config=config;
    
    this.default=function(){
        tasks.default(this.config);
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
        tasks.appBuild(this.config);
    };
    this.vulcanize=function(){
        tasks.vulcanize(this.config);
    };
    this.writeAppImports=function(){
        tasks.writeAppImports(this.config);
    };
    this.watchAppImports=function(){
        tasks.writeAppImports(this.config);
    };
    this.appSrcArray=function(){
        return getAppSrcArray();
    }
};