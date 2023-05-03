

const {exec, spawn} = require('child_process');
const whitelist = ["SKIPPING"]
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

          let output = [];
          child.stdout.on('data', async (data) => {
            data = data.toString();
            console.log(data);
            output.push(data);
            
          });
          child.stderr.on('data', async (data) => {
            data = data.toString();
            console.log(data);
            output.push(data);
          });
          child.on('close', async (code) => {
              console.log(output);
              console.log(19,`child process exited with code ${code}`);
              await callbackLog(output);
              res(code);
          });
  
     
    });
}

