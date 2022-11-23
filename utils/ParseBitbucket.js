
module.exports = function(json){
    let {push:{changes:[{new:{name:branch, target:{message}}}]}} = json;
    return {branch,message};
}