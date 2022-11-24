const axios = require('axios');


function recurse(arr,callback,callbackFinish,index=0){
    if(index < arr.length){
        // console.log(6, arr[index]);

        callback(arr[index]).then(()=>{
            index++;
            setTimeout(()=>{
                recurse(arr, callback,callbackFinish,index)
            },1000);
        }).catch(err=>{
            index++;
            setTimeout(()=>{
                recurse(arr, callback,callbackFinish,index)
            },1000);
        });

    } else {
        callbackFinish();
    };
}


module.exports = function(urls, params){

    return new Promise((res, rej)=>{
        recurse(urls, function(url){

            return axios(url,{
                params,
            }).then(res=>res.data)
            .then(res=>{
                return Promise.resolve(res);
            }).catch(err=>{
                return Promise.resolve(err.message);
            });
    
        },res);
    })


    // return Promise.all(urls.map(url=>{
    //     return axios(url,{
    //         params,
    //     }).then(res=>res.data)
    //     .then(res=>{
    //         return Promise.resolve(res);
    //     }).catch(err=>{
    //         return Promise.resolve(err.message);
    //     });
    // })).catch(err=>{
    //     console.log(err.message);
    // });
}