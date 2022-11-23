const axios = require('axios');


module.exports = function(url, data){
    return axios(url,{
        headers:{
            'Content-Type':'application/json',
        },
        data
    }).then(res=>res.data)
    .then(res=>{
        console.log(res);
    }).catch(err=>{
        throw err;
    });
};