

const {exec} = require('child_process');

module.exports = function(script, callbackLog){
    return new Promise((res,rej)=>{

        console.log(`bash ${script}`);

        const workerProcess = exec(`bash ${script}`,async (error,stdout,stderr)=>{

            

            if(error != null){
                rej(error);
            };

            if(stdout){
                // console.log(stdout);
                await callbackLog({
                    log:`${new Date().getTime()} ${JSON.stringify(stdout)}`,
                    text:`${new Date().getTime()} ${JSON.stringify(stdout)}`,
                    message:`${new Date().getTime()} ${JSON.stringify(stdout)}`,
                });
            };
            
            if(stderr){
                // console.log(stderr);
                await callbackLog({
                    log:`${new Date().getTime()} ${JSON.stringify(stderr)}`,
                    text:`${new Date().getTime()} ${JSON.stringify(stderr)}`,
                    message:`${new Date().getTime()} ${JSON.stringify(stderr)}`,
                });
            };


        });

        workerProcess.on('exit', function (code) {
            console.log('exited');
            res(code);
        });

    });
}

