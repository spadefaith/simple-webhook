
module.exports = function(json){
    
    let {push:{changes:[{new:{name:branch, target:{message}}}]}} = json;


    console.log(7,json);

    return {branch,message};
}