

const {exec, spawn} = require('child_process');
module.exports = function(script, callbackLog){
    return new Promise((res,rej)=>{

        console.log(`bash ${script}`);

        const child = spawn(`bash ${script}`,[], {
            shell: true,
            cwd: process.cwd(),
            env: process.env,
            stdio: ['inherit'],
            encoding: 'utf-8',
          });


          child.stdout.on('data', async (data) => {
            data = encodeURI(data.toString());

            console.log(data);
            await callbackLog(data);
          });
          child.stderr.on('data', async (data) => {
            data = encodeURI(data.toString());

            console.log(data);
            await callbackLog(data);
          });
          child.on('close', async (code) => {
              console.log(19,`child process exited with code ${code}`);
              res(code);
          });
  
     
    });
}

