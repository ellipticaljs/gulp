import elliptical from './references/elliptical';
import container from './dependencies/container';
import startup from './startup';


//create the app
var app = elliptical();


//-------configuration-------------------------------------------------
//views root
var viewsRoot = '/app/views';
var $Template = elliptical.$Template; ///template provider
$Template.setRoot(viewsRoot);  ///set views root
var View=elliptical.View;
View.$provider=$Template;


app.configure(function () {
    //use hashTags for url routing
    app.hashTag = true;

    //app.router
    app.use(app.router);

    //error
    app.use(elliptical.httpError());

    //http 404
    app.use(elliptical.http404());
});



//bind startup(routes)
startup(app);



/* listen */
app.listen(); //app.listen(true,fn(){}) for single page app

export default app;