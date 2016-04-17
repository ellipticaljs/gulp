elliptical.module=(function (app) {

    //assign the app function
    app = elliptical();

    //var declarations
    var Service = elliptical.Service;
    var Location = elliptical.Location;
    var $Cookie=elliptical.$Cookie;
    var Notify=elliptical.Notify;
    var $Notify=elliptical.$Notify;
    var DomEvent = elliptical.DomEvent;


    //app Dependency Injection container
    var container=app.container;

    //define a rest api static class
    var $Rest = elliptical.$Rest;
    var apiProtocol, apiHost, apiPort, apiPath='/api';


    //dev env
    app.configure('development',function(){
        apiPort=location.port;
        apiProtocol = 'http';
        apiHost = 'localhost';
    });

    //production env
    app.configure('production',function(){
        apiProtocol = location.protocol.replace(':', '');
        apiPort = (apiProtocol === 'https') ? 443 : 80;
    });

    //both environments
    app.configure(function(){
        //use hash tag routes
        app.hashTag=true;

        // middleware service locator
        app.use(elliptical.serviceLocator());

        //app.router
        app.use(app.router);

        //error
        app.use(elliptical.httpError());

        //http 404
        app.use(elliptical.http404());
    });

    //static rest class props
    $Rest.protocol = apiProtocol;
    $Rest.host = apiHost;
    $Rest.path = apiPath;
    $Rest.port = apiPort;

    //rest api instance
    var $rest = new $Rest();


    //registrations

    ///map the rest api as default Service provider
    //container.mapType('Service', Service, $rest);
    container.registerType('Location',Location);
    container.registerType('$Cookie',$Cookie);
    container.registerType('DomEvent', DomEvent);
    container.mapType('Notify', Notify, $Notify);
    //register the rest api static class
    //container.registerType('$Rest',$Rest);

    /* listen */
    app.listen(); //app.listen(true,fn(){}) for single page app

    return app;

})(elliptical.module);
