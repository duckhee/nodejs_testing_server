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
    //시리얼 정보 파라미터로 가져오기
    var serial_info = req.query.serial_Num || req.params.serial_Num;
    //실패할시에 가져올 이미지 경로
    var failed_path = {
        "field_id": "failed",
        "folder_name": "failed",
        "img_name": "failed.jpg",
        "createdAt": ""
    };
    //serial 정보로 넘어온 게 있을 경우
    if (serial_info) {
        camera_path = { "si_serial": serial_info };
        //get path in db
        imagecontroller.find_camera(camera_info, function(row, err) {
            if (row) {
                //get file path 
                //경로에 있는 폴더와 이미지파일이 존재하는지 확인 
                //if (!fs.existsSync(process.cwd() + '/camera_images/' + path_info + '/' + row.folder_name + '/' + ))
                res.json(row);

            } else if (err) {
                console.log('ajax get images error : ', err.stack);
                //default images
                res.json(failed_path);
            } else {
                //default images
                res.json(failed_path);
            }
        });
    } else {
        //데이터가 없을시
        console.log('not query parameter !');
        res.json(failed_path);
    }
});

//get data ajax
router.get('/ajax_get_data', function(req, res, next) {
    var serial_info = req.query.serial_Num || req.params.serial_Num;
    data_info = { "sd_serial": serial_info };
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

//index router 
router.get('/', function(req, res, next) {
    //get serial num ???
    var serial = req.query.serial_Num || req.param.serial_Num || req.params.serial_Num;
    //camera 정보를 가져오기 위해서 serial 정보 JSON으로 담아주기
    var camera_info = {
        'si_serial': serial
    };
    var devices;
    var path = '/images/failed/failed/failed.jpg'
    datacontroller.group_device(function(group_row, err) {
        if (group_row) {
            devices = JSON.stringify(group_row);
            imagecontroller.find_camera(camera_info, function(rows, err) {
                if (rows) {
                    if (fs.existsSync(process.cwd() + '/camera_images/' + ))
                }
            });
        }
    });
    res.render('./pages/index');
});


module.exports = router;