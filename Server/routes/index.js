/*
 * 파일 다운로드 post 요청 ? 
 * 첫번째 미들웨어는 알집 진행
 * 두번째 미들웨어 알집 파일 찾아서 있으면 다음으로 진행 아니면, alter
 * 세번째 미들웨어는 다운로드 진행
 * 네번째 미들웨어는 다운로드 완료 후 원래 페이지로 redirect
 *  
 */


var express = require('express');
var router = express.Router();
var moment = require('moment'); //시간 모듈

//controllers
//var cameraControllers = require('../controllers/camera');
var fileControllers = require('../util/file');
var dataControllers = require('../controllers/data_controller');

/* GET home page. */
router.get('/', function(req, res, next) {






    res.render('./pages/test_index', {
        serial: 1,
        img_path: 1,
        devices: 2,
        createdAt: ''
    });
});

//download value download
router.post('/process/value_download', function(req, res, next) {
    //serial num 으로 데이터 검색 및 다운로드 진행 
    var serial_Num = req.query.serialnum || req.params.serialnum;
    //파일을 만들기 위해서는 res를 넘겨 주어야한다.
    var data_info = { "select_sensor": serial_Num, "response": res, };
    fileControllers.file_csv(data_info, function(e) {
        if (e) {
            console.log(e.stack);
            res.redirect('/');
        }
    });
    // next();
    res.redirect('/');
});

//zip folder
router.post('/process/zip', function(req, res, next) {

});

//post folder download
router.post('/process/download/zip', function(req, res, next) {

});

//file download url get
router.get('/file_downlaod', function(req, res, next) {
    var filename = req.query.filename || req.params.filename;
    console.log(filename);
    fileinfo = { 'name': filename };
    //  fileControllers.file_download(fileinfo, function(result, err) {

    //});
    res.redirect('/');
});


//get data ajax
router.get('/ajax', function(req, res, next) {
    //parameter value
    var serial_data = req.query.serial_Num || req.params.serial_Num;
    var address_data = req.query.address || req.params.address;
    console.log('test');
    dataControllers.get_test_data([], function(row, err) {
            if (row) {
                res.json(row);
            } else if (err) {
                res.json(err);
            } else {
                res.json(null);
            }
        })
        // next();
});

//get image path ajax
router.get('/ajaxpath', function(req, res, next) {
    //parameter value
    var channel = req.query.serial_Num || req.params.serial_Num;
    var path = req.query.path || req.params.path;
    //next();
    res.json(2);
});

//get image slide ajax
router.get('/ajaxGetImage', function(req, res, next) {
    //parameter value
    var channel = req.query.serial_Num || req.params.serial_Num;
    var startDate = req.query.startDate || req.params.startDate;
    var endDate = req.query.endDate || req.params.endDate;
    next();
});

// //insert data
// router.get('/insert', function(req, res, next) {
//     //parameter get
//     var channel = req.query.channel || req.params.channel;


//     var value_info = {};
// });

//change setting
router.post('/process/setting', function(req, res, next) {

});



module.exports = router;