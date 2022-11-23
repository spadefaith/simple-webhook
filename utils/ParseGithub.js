
module.exports = function(json){
    let {ref, pusher:{name}, commits:[{message}]} = json;
    let branch = ref.split('/')[2];
    return {branch,name,message};
}