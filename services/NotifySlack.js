const axios = require('axios');
const ReplaceVariable = require('./ReplaceVariable');

function recurse(arr,callback,callbackFinish,index){
    if(index < arr.length){
        // console.log(6, arr[index]);

        callback(arr[index],index).then(()=>{
            index++;
            setTimeout(()=>{
                recurse(arr, callback,callbackFinish,index)
            },300);
        }).catch(err=>{
            index++;
            setTimeout(()=>{
                recurse(arr, callback,callbackFinish,index)
            },300);
        });

    } else {
        callbackFinish();
    };
}


module.exports = async function(urls, params){

    // console.log(28,urls);

    if(!urls.length){
        return ;
    };
    
    return new Promise((res, rej)=>{
        recurse(params, function(param,index){
            // console.log(index);
            
            let {message,name,branch,repo, error, type} = param;
            
            let text = "";
            if(type == 'log'){
                text = `REPOSITORY ${repo} has new COMMIT, message: ${message}`;
            } else if (type == 'success'){
                text = `REPOSITORY ${repo} has new COMMIT in branch ${branch}, message: ${message}, by user ${name}`;
            } else if (type == 'error'){
                text = `simple-webhook has new error - ${error}`;
            };
            
            return new Promise((res, rej)=>{
                recurse(urls, function(url, index){
                    return axios.post(url,{
                        text
                    }).then(res=>res.data)
                    .then(res=>{
                        // console.log(45,index, res);
                        return Promise.resolve(res);
                    }).catch(err=>{
                        // console.log(48,err.message);
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