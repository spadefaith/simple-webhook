
module.exports = function(json){

    console.log(4, json);

    let {ref, pusher:{name}, commits:[{message}]} = json;
    let branch = ref.split('/')[2];
    return {branch,name,message};
}