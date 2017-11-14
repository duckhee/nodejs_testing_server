var express = require('express');
var router = express.Router();
//controller set 
var imagecontroller = require('../controllers/camera_controller');
var datacontroller = require('../controllers/data_controller');
var settingcontroller = require('../controllers/setting_controller');
//util set
var downloader = require('../util/file');

//get picture ajax
router.get('/ajax_get_images', function(req, res, next) {

});

//get data ajax
router.get('/ajax_get_data', function(req, res, next) {

});


//index router 
router.get('/', function(req, res, next) {
    var serial = req.query.serial_Num || req.param.serial_Num || req.params.serial_Num;
    res.render('./pages/index');
});

//download zip
router.post('/process/download_zip', function(req, res, next) {

});

//download csv
router.post('/process/download_csv', function(req, res, next) {
    var serial_Num = req.query.serial_Num || req.param.serial_Num || req.params.serial_Num;
    //파라미터를 넘겨주기 위한 객체 생성
    var csv_info = { "sd_serial": serial_Num, "response": res };
    downloader.file_csv(csv_info, function(row, err) {
        if (row) {
            console.log('success : ', row);
            res.redirect('/');
        } else if (err) {
            console.log('error : ', err.stack);
            res.render('../error/500');
        } else {
            console.log('null');
            res.render('./error/404');
        }
    })
});

module.exports = router;