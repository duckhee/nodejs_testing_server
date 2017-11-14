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
    var serial_info = req.query.serial_Num || req.params.serial_Num;

    camera_path = { "serial_Num": serial_info };

    imagecontroller.find_camera(camera_info, function(row, err) {

    });

});

//get data ajax
router.get('/ajax_get_data', function(req, res, next) {
    var serial_info = req.query.serial_Num || req.params.serial_Num;
    data_info = { "serial_Num": serial_info };
    if (serial_info) {
        var data = datacontroller.list_limit(data_info, function(rows, err) {
            if (rows) {
                res.json(rows);
            } else if (err) {
                console.log('error : ', err.stack);
                res.render('./error/500');
            } else {
                res.render('./error/404');
            }
        });
    } else {
        res.render('./error/404');
    }
});

//index router 
router.get('/', function(req, res, next) {
    var serial = req.query.serial_Num || req.param.serial_Num || req.params.serial_Num;
    res.render('./pages/index');
});

//insert datat http query or parameter json parser //serial 번호 하나와 나머지다 ~
router.post('/insert_data', function(req, res, next) {
    var rowdata_info = '';
    req.on('data', function(data) {
        rowdata_info = JSON.parse(data);
        var data_info = {};
        datacontroller.insert_data(data_info, function(row, err) {
            if (row) {
                res.json(row);
            } else if (err) {
                console.log('errror : ', err.stack);
                res.json('error');
            } else {
                console.log('null');
                res.json('failed... retry');
            }
        });
    });
    res.redirect('/');
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
            res.render('./error/500');
        } else {
            console.log('null');
            res.render('./error/404');
        }
    })
});

module.exports = router;