
module.exports = function(json){


    let {ref, user_username:name, commits:[{message}]} = json;
    let branch = ref.split('/')[2];
    return {branch,name,message};
}