elliptical.module=(function(app){
    var container=app.container;

    var SampleProvider=function(){
        this.get=function(params,resource,query,callback){
            if(callback) callback(null,params);
        }
    }

    container.registerType('$SampleProvider',new SampleProvider());

    return app;
})(elliptical.module);
