/*
 * 파일 다운로드 post 요청 ? 
 * 첫번째 미들웨어는 알집 진행
 * 두번째 미들웨어 알집 파일 찾아서 있으면 다음으로 진행 아니면, alter
 * 세번째 미들웨어는 다운로드 진행
 * 네번째 미들웨어는 다운로드 완료 후 원래 페이지로 redirect 
 */


var express = require('express');
var router = express.Router();
var moment = require('moment'); //시간 모듈

//controllers
//var cameraControllers = require('../controllers/camera');
//var fileControllers = require('../controllers/file');
//var channelControllers = requir('../controllers/channel.js');
//var valueContorllers = require('../controllers/value');

/* GET home page. */
router.get('/', function(req, res, next) {






    res.render('./pages/index', {
        channel: 1,
        img_path: 1,
        devices: 1,
        createdAt: ""
    });
});

router.get('/file_downlaod', function(req, res, next) {
    var filename = req.query.filename || req.params.filename;
    console.log(filename);
    fileinfo = { 'name': filename };
    //  fileControllers.file_download(fileinfo, function(result, err) {

    //});
});


//get data ajax
router.get('/ajax', function(req, res, next) {
    //parameter value
    var channel = req.query.channel || req.params.channel;
    next();
});

//get image path ajax
router.get('/ajaxpath', function(req, res, next) {
    //parameter value
    var channel = req.query.channel || req.params.channel;
    var path = req.query.path || req.params.path;
    next();
});

//get image slide ajax
router.get('/ajaxGetImage', function(req, res, next) {
    //parameter value
    var channel = req.query.channel || req.params.channel;
    var startDate = req.query.startDate || req.params.startDate;
    var endDate = req.query.endDate || req.params.endDate;
    next();
});

module.exports = router;