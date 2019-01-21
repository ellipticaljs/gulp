var gulp=require('gulp'),
  http = require('http'),
  sass = require('gulp-sass'),
  watch=require('gulp-watch'),
  concat=require('gulp-concat'),
  vulcanize = require('gulp-vulcanize'),
  inject = require('gulp-inject'),
  del =require('del'),
  babel=require('gulp-babel'),
  minify = require('gulp-minify-css'),
  htmlmin = require('gulp-htmlmin');


var tasks={};
var _config;

//--internal------------------------------------------------------------------------------------------------------------
tasks.default=function(){
  var _tasks='elliptical gulp tasks: ';
  _tasks+='sass-compile|sass-compile-min|sass-watch|';
  _tasks+='app-build|app-watch|app-imports|app-clean|';
  _tasks+='watch|copy-config|';
  _tasks+='vulcanize|vulcanize-min';

  console.log(_tasks);
};


//compile sass
tasks.sassCompile=function(config){
  compileSass(config);
};

tasks.sassCompileMin=function(config){
  compileSassMin(config);
};

//watch sass
tasks.sassWatch=function(config){
  watchSass(config);
};

//watch app
tasks.appWatch=function(config){
  watchApp(config);
};

//build app
tasks.appBuild=function(config){
  buildApp(config);
};

//build app to dist
tasks.appBuildDist=function(config){
  buildAppDist(config);
};

//write app imports
tasks.appImports=function(config){
  writeAppImports();
};

//write native app imports
tasks.appNativeImports=function(config){
  writeNativeAppImports();
};

//watch app, watch sass
tasks.watch=function(config){
  watchSass(config);
  watchApp(config);
};


//clean app bin
tasks.appClean=function(config){
  deleteAppBinDirectoryFiles(config);
};

//copy config
tasks.copyConfig=function(config){
  copyConfig();
};

//vulcanize
tasks.vulcanize=function(config){
  vulcanizeImportFile(config);
};

//vulcanize min
tasks.vulcanizeMin=function(config){
  vulcanizeAndMinifyImportFile(config);
};




///--private------------------------------------------------------------------------------------------------------------

function watchSass(config){
  watch(config.sassSrc,function(files){
    compileSass(config);
  });
}

function compileSass(config){
  gulp.src(config.sassApp)
    .pipe(sass())
    .pipe(gulp.dest(config.cssDest));
}

function compileSassMin(config){
  gulp.src(config.sassApp)
    .pipe(sass())
    .pipe(minify())
    .pipe(gulp.dest(config.cssDest));
}

function getAppSrcArray(root){
  return [root + '/references/**/*.js',root + '/dependencies/**/*.js',
    root + '/providers/**/*.js',root + '/services/**/*.js',
    root + '/middleware/**/*.js',root + '/modules/**/*.js',
    root + '/controllers/**/*.js',root + '/bindings/**/*.js',root + '/startup.js',root + '/app.js']
}

function buildApp(config){
  deleteAppBinDirectoryFiles(config);
  transpileApp();
}

function buildAppDist(config){
  deleteAppBinDirectoryFiles(config);
  transpileAppDist();
}

function watchApp(config){
  var root=config.appScriptPath;
  watch(root + '/**/*.js',function(files){
    buildApp(config);
  });
}

function vulcanizeImportFile(config){
  return gulp.src(config.importSrc + '/import.html')
    .pipe(vulcanize({
      abspath: '',
      excludes: [],
      stripExcludes: config.stripExcludes,
      inlineScripts: config.inlineScripts,
      inlineCss: config.inlineCss
    }))
    .pipe(gulp.dest(config.vulcanDest));
}

function deleteAppBinDirectoryFiles(config){
  var root=config.binScriptPath;
  del.sync([root + '/**', '!' + root]);
}

function transpileApp(){
  var root=_config.appScriptPath;
  var outputRoot=_config.binScriptPath;
  return gulp.src(root + '/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(outputRoot))
    .on('end',writeAppImports);

}

function transpileAppDist(){
  var root=_config.appScriptPath;
  var outputRoot=_config.binScriptPath;
  return gulp.src(root + '/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(outputRoot))
    .on('end',concatAppFiles);

}

function writeAppImports(){
  var root=_config.binScriptPath;
  var src=getAppSrcArray(root);
  var target = gulp.src(_config.importSrc + '/app.html');
  var sources = gulp.src(src, {read: false});
  return target.pipe(inject(sources,{relative:true}))
    .pipe(gulp.dest(_config.importSrc));
}

function writeNativeAppImports(){
  var root=_config.appScriptPath;
  var src=getAppSrcArray(root);
  var target = gulp.src(_config.importSrc + '/app.html');
  var sources = gulp.src(src, {read: false});
  return target.pipe(inject(sources,{relative:true}))
    .pipe(gulp.dest(_config.importSrc));
}


function vulcanizeAndMinifyImportFile(config){
  return gulp.src(config.vulcanDest + "/import.html")
    .pipe(htmlmin({
      minifyJS: true,
      minifyCSS: true,
      removeComments: true
    }))
    .pipe(gulp.dest(config.vulcanDest));
}

function copyConfig(){
  gulp.src(['./node_modules/elliptical-gulp/templates/config/config.json','./node_modules/elliptical-gulp/templates/config/.babelrc','./node_modules/elliptical-gulp/templates/config/.eslintrc'])
    .pipe(gulp.dest('./'));
}

function concatAppFiles(){
  var name='app.js'
  var binRoot=_config.binScriptPath;
  var dest=_config.binDest
  var src=getAppSrcArray(binRoot);
  gulp.src(src)
    .pipe(concat(name))
    .pipe(gulp.dest(dest));
}

//--public--------------------------------------------------------------------------------------------------------------
module.exports=function Tasks(config){
  this.config=config;
  _config=config;

  this.default=function(){
    tasks.default(this.config);
  };
  this.sassCompile=function(){
    tasks.sassCompile(this.config);
  };
  this.sassCompileMin=function(){
    tasks.sassCompileMin(this.config);
  };
  this.sassWatch=function(){
    tasks.sassWatch(this.config);
  };
  this.appBuild=function(){
    tasks.appBuild(this.config);
  };
  this.appBuildDist=function(){
    tasks.appBuildDist(this.config);
  };
  this.appImports=function(){
    tasks.appImports(this.config);
  };
  this.appNativeImports=function(){
    tasks.appNativeImports(this.config);
  };
  this.appWatch=function(){
    tasks.appWatchImports(this.config);
  };
  this.watch=function(){
    tasks.watch(this.config);
  };
  this.appClean=function(){
    tasks.appClean(this.config);
  };
  this.vulcanize=function(){
    tasks.vulcanize(this.config);
  };
  this.vulcanizeMin=function(){
    tasks.vulcanizeMin(config);
  };
  this.copyConfig=function(){
    tasks.copyConfig();
  };
  this.appSrcArray=function(root){
    return getAppSrcArray(root);
  };

};