elliptical.module=(function(app){
    var container=app.container;

    elliptical.binding('sample',function(node){
        console.log('sample');
    });

    return app;
})(elliptical.module);
