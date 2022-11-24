const axios = require('axios');
const ReplaceVariable = require('./ReplaceVariable');

function recurse(arr,callback,callbackFinish,index){
    if(index < arr.length){
        // console.log(6, arr[index]);

        callback(arr[index],index).then(()=>{
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


module.exports = function(url, params){


    return new Promise((res, rej)=>{
        recurse(params, function(param,index){
            // console.log(index);

            let replacedUrls = ReplaceVariable(url, param);

            return new Promise((res, rej)=>{
                recurse(replacedUrls, function(url, index){
  

                    return axios(url).then(res=>res.data)
                    .then(res=>{
                        // console.log(index, res);
                        return Promise.resolve(res);
                    }).catch(err=>{
                        return Promise.resolve(err.message);
                    });
                },res,index=0);
            })
            

        }, res,index = 0);
    });

    // return new Promise((res, rej)=>{
    //     let index = 0;
    //     recurse(urls, function(url,index){
    //         console.log(index, urls);
    //         return axios(url).then(res=>res.data)
    //         .then(res=>{
    //             console.log(index, res);
    //             return Promise.resolve(res);
    //         }).catch(err=>{
    //             return Promise.resolve(err.message);
    //         });
    
    //     },res,index);
    // })


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