const {Notify, TriggerBash, ReplaceVariable} = require('../services');

module.exports = async function(data,body,parser){

    let script = data.script;
    let callbackSuccess = data.callbackSuccess;
    let callbackFailed = data.callbackFailed;
    let callbackLog = data.callbackLog;
    let repo = data.repo;

    try {
        let {message, name, branch} = parser(body);
        
        if(script){
            const regexp = new RegExp(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i);
            const isUrl = regexp.test(script);

            if(isUrl){

                await TriggerHttp(script, data);
            } else {
                await TriggerBash(script, async function(logs){
                    logs = logs.map(log=>{
                        return {
                            log,text:log,message:log,repo
                        };
                    });

                    return Notify(callbackLog, logs);

                    
                });
            };
        }



        callbackSuccess && (await Notify(callbackSuccess,[{
            message,name,branch,repo
        }]));

    } catch(err){

        callbackFailed && (await Notify(callbackFailed, [{
            error:err.message
        }]));
        throw err;
    };
};