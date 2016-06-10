import container from '../dependencies/container';

class SampleProvider{
    get(params,resource,query,callback){
        if(callback) callback(null,params);
    }
}

container.registerType('$SampleProvider',new SampleProvider());



