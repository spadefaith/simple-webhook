const express = require('express');
const app = express();

const {ParseGithub, ParseBitbucket} = require('./utils');

const Controller = require('./controllers');

app.use(express.json());

app.post('/webhooks/bitbucket/:repo',async function(req,res,next){
    try {
        let script = req.query.script;
        let callbackSuccess = req.query.callback_success;
        let callbackFailed = req.query.callback_failed;
        let callbackLog = req.query.callback_log;
        let repo = req.params.repo;
        await Controller({
            script,callbackFailed,callbackSuccess,repo,callbackLog
        },req.body,ParseBitbucket)
        return res.json({status:1});
    } catch(err){

        return res.json({status:0});
    };
});

app.post('/webhooks/github/:repo',async function(req,res,next){
    try {
        let script = req.query.script;
        let callbackSuccess = req.query.callback_success;
        let callbackFailed = req.query.callback_failed;
        let callbackLog = req.query.callback_log;
        let repo = req.params.repo;
        await Controller({
            script,callbackFailed,callbackSuccess,repo,callbackLog
        },req.body,ParseGithub)
        return res.json({status:1});
    } catch(err){

        return res.json({status:0});
    };
});

/**replace it with notification url */
app.use('/notify',function(req,res,next){
    console.log(45,req.query);
    res.json({status:1});
});

app.listen(8989,function(err){
    if(err){
        console.error(err);
    } else {
        console.log('listening to port ',8989);
    }
});



