var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');

var regIds = [];


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/register', function (req, res, next) {
    console.log('test',req.body);
    var regId = req.body.regId;    // /register?regId=xxx
    console.log('PUSH ID : ', regId);
    regIds.push(regId);
    res.end();
});

router.post('/unregister', function (req, res, next) {
    var regId = req.body.regId;    // /unregister?regId=xxx
    console.log('해제ID', regId);
    regIds.splice(regIds.indexOf(regId));
    res.end();
});

router.post('/push', function (req, res, next) {
    var message = new gcm.Message();
    var sender = new gcm.Sender('AIzaSyB60OXjwEzmVODhYNAeKtPduv990HZhs6I'); // Server API key
    console.log('req.body', req.body);
    var message1 = req.body.message1;
    var message2 = req.body.message2;
    message.addData('key1', message1);
    message.addData('key2', message2);
    sender.sendNoRetry(message, regIds, function (err, result) {
        if (err) console.error('err', err);
        else console.log('result', result);
    });
    res.redirect('/');
});

module.exports = router;
