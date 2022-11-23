const axios = require('axios');
module.exports = function(url, params){

    return axios(url,{
        params,
    }).then(res=>res.data)
    .then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err.message);
    })
}