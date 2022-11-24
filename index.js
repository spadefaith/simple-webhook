const express = require('express');
const app = express();

const {ParseGithub, ParseBitbucket} = require('./utils');

const Controller = require('./controllers');

app.use(express.json());

app.post('/test',async function(req,res,next){

    console.log(req.body)

    return res.json({status:1});
});

app.post('/webhooks/bitbucket/:repo',async function(req,res,next){
    let callbackSuccess, script, callbackFailed, callbackLog, repo;
    try {
        script = req.query.script;
        callbackSuccess = req.query.callback_success ? req.query.callback_success.split("|") : [];
        callbackFailed = req.query.callback_failed ? req.query.callback_failed.split("|") : [];
        callbackLog = req.query.callback_log ? req.query.callback_log.split("|"): [];
        repo = req.params.repo;


        req.body.repo = repo;

        console.log(29,req.query);

        Controller({
            script,callbackFailed,callbackSuccess,repo,callbackLog
        },req.body,ParseBitbucket)
        return res.json({status:1});
    } catch(err){
        console.log(err);
        return res.json({status:0});
    };
});

app.post('/webhooks/github/:repo',async function(req,res,next){
    let callbackSuccess, script, callbackFailed, callbackLog, repo;
    try {
        script = req.query.script;
        callbackSuccess = req.query.callback_success ? req.query.callback_success.split("|") : [];
        callbackFailed = req.query.callback_failed ? req.query.callback_failed.split("|") : [];
        callbackLog = req.query.callback_log ? req.query.callback_log.split("|"): [];
        repo = req.params.repo;

        req.body.repo = repo;

        Controller({
            script,callbackFailed,callbackSuccess,repo,callbackLog
        },req.body,ParseGithub)
        return res.json({status:1});
    } catch(err){
        console.log(err);
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



