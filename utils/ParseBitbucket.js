
module.exports = function(json){
    
    let {push:{changes:[{new:{name:branch, target:{message}}}]},actor:{display_name:name}} = json;


    console.log(7,json);

    return {branch,message,name};
}