elliptical.module=(function(app){
    var container=app.container;
    var Sample=elliptical.Service.extend({},{});
    container.mapType('Sample',Sample,'$SampleProvider');

    return app;
})(elliptical.module);


import container from '../dependencies/container';

class Label {
    static get(query) {
        var keys = Object.keys(query);
        var q;
        if (keys[0] && keys[0] !== '$orderBy' && keys[0] !== '$orderByDesc') {
            q = query[keys[0]];
            var decoded = decodeURIComponent(q);
            return ' match "' + decoded + '"';
        } else return '';
    }
}

container.registerType('Label', Label);