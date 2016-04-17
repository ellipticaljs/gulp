elliptical.module=(function(app){
    var container=app.container;
    var controller=new elliptical.Controller(app,'Home');
    controller('/@action',{
        Index:function(req,res,next){
            res.render();
        }

    });

    return app;
})(elliptical.module);
