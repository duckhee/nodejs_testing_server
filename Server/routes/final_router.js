var express = require('express');
var router = express.Router();
//controller set 
var imagecontroller = require('../controllers/camera_controller');
var datacontroller = require('../controllers/data_controller');
var settingcontroller = require('../controllers/setting_controller');
//util set
var downloader = require('../util/file');
//get file module
var fs = require('fs');

//get picture ajax
router.get('/ajax_get_images', function(req, res, next) {
    var serial_info = req.query.serial_Num || req.params.serial_Num;
    if (serial_info) {
        camera_path = { "serial_Num": serial_info };
        //get path in db
        imagecontroller.find_camera(camera_info, function(row, err) {
            if (row) {
                //get file path 
                res.json(row);

            } else if (err) {
                console.log('ajax get images error : ', err.stack);
                //default images
                var failed_path = {};
                res.json(failed_path);
            } else {
                //default images
                var failed_path = {};
                res.json(failed_path);
            }
        });
    } else {
        //데이터가 없을시
        console.log('not query parameter !');
        var failed_path = {};
        res.json(failed_path);
    }
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
                console.log('ajax get data error : ', err.stack);
                res.render('./error/500');
            } else {
                console.log('could not get ajax data');
                res.render('./error/404');
            }
        });
    } else {
        res.render('./error/404');
    }
});

//index router 
router.get('/', function(req, res, next) {
    //get serial num ???
    var serial = req.query.serial_Num || req.param.serial_Num || req.params.serial_Num;
    var path = '/images/failed/failed/failed.jpg'
    res.render('./pages/index');
});

//insert datat http query or parameter json parser //serial 번호 하나와 나머지다 ~
router.post('/insert_data', function(req, res, next) {
    var rowdata_info = '';
    //get json data
    req.on('data', function(data) {
        rowdata_info = JSON.parse(data);
        var data_info = {};
        datacontroller.insert_data(data_info, function(row, err) {
            if (row) {
                res.json(row);
            } else if (err) {
                console.log('ajax data insert error : ', err.stack);
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
            console.log('down load csv file error : ', err.stack);
            res.render('./error/500');
        } else {
            console.log('null');
            res.render('./error/404');
        }
    })
});

module.exports = router;