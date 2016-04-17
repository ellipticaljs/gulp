elliptical.module=(function(app){
    var container=app.container;
    var Sample=elliptical.Service.extend({},{});
    container.mapType('Sample',Sample,'$SampleProvider');

    return app;
})(elliptical.module);
