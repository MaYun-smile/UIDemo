import _ from 'lodash/core'
import trim from 'lodash/trim'

_.isNumeric = function(v){
    return _.isNumber(v);
}

_.isEmptyObject = function(v){
    return _.isEmpty(v);
}

_.toJSON = JSON.stringify;

_._each = _.each;

_.each = function(array,fn,scope){
    let newFn = function(item,index){
        fn(index,item);
    }
    _._each(array,newFn,scope);
}

_.inArray=function(item,array,index){
    return _.indexOf(array,item,index);
}

_.trim = trim;

export default _