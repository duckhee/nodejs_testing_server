var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var fs = require('fs');
var dataControllers = require('./Server/controllers/data_controller');
var cameraControllers = require('./Server/controllers/camera_controller');
var settingControllers = require('./Server/controllers/setting_controller');
var socketIo = require('socket.io');


///////////////////////////////////////////////////////////////////////////////////////////////////////
//카메라 사진 저장
var io = socketIo.listen(5001), // 이미지 저장관련 소켓
    dl = require('delivery'), //이미지 전달 모듈
    moment = require('moment'); //시간 모듈

io.sockets.on('connection', function(socket) {
    console.log('io sockets on connection');

    var delivery = dl.listen(socket);

    delivery.on('receive.success', function(file) {
        //채널별 폴더유무 체크
        console.log("delivery on");
        var params = file.params;

        var date_folder = moment().format('YYYYMM');

        //일별 폴더 유무 체크
        fs.exists(process.cwd() + '/camera_images/' + params.serial + "/" + date_folder, function(exists) {
            console.log(exists);
            if (!exists) {
                //채널 폴더 유무 체크
                fs.exists(process.cwd() + '/camera_images/' + params.serial, function(exists) {
                    if (!exists) {
                        fs.mkdir(process.cwd() + '/camera_images/' + params.serial, '0777', function(err) {
                            if (err) {
                                console.log('mkdir first error');
                                console.log(err.stack);
                                throw err;
                            }
                            console.log('dir channel writed');
                        });
                    }
                    fs.mkdir(process.cwd() + '/camera_images/' + params.serial + '/' + date_folder, '0777', function(err) {
                        if (err) {
                            console.log('mkdir seconde err');
                            console.log(err.stack);
                            throw err;
                        } else {
                            console.log('dir data writed');
                        }

                    });


                });
            }

            //이미지일 경우만 저장
            console.log("image upload start");
            fs.writeFile(process.cwd() + '/camera_images/' + params.serial + "/" + date_folder + "/" + params.filename, file.buffer, function(err) {
                if (err) {
                    console.log('File could not be saved: ' + err);
                } else {
                    var filename_arr = params.filename.split(".");
                    var camera_info = {
                        "si_serial": params.serial,
                        "si_path": date_folder,
                        "si_filename": params.filename,
                        "si_filesize": params.filesize,
                        // "createdAt": filename_arr[0],
                        // "updatedAt": filename_arr[0]
                    };
                    console.log(camera_info);
                    cameraControllers.insert_image(camera_info, function(err, row) {
                        if (err) {
                            //console.log(err);
                        } else if (row) {
                            console.log(row.stack);
                        } else {
                            console.log('error');
                        }
                    });
                    console.log('File ' + params.filename + " saved");
                };
            });

        });

    });

    socket.on('disconnect', function() {
        console.log('user disconnected');

    });
    //디바이스 정보 입력
    socket.on('device_setting_request', function(data) {
        //console.log(data);        
        //처음 디바이스 등록일 경우
        if (data.msg == 0) {
            settingControllers.create_setting(data.info, function(row, err) {
                settingControllers.find_setting(data.info, function(row, err) {
                    if (row) {
                        io.emit('device_setting_receive_' + row.st_serial, row);
                    } else if (err) {
                        console.log('ajax data insert error : ', err.stack);
                    } else {
                        console.log('null');
                    }
                });
            });
        }

        //기존 디바이스 정보 수정 일 경우
        if (data.msg == 1) {
            settingControllers.update_setting(data.info, function(row, err) {
                settingControllers.find_setting(data.info, function(row, err) {
                    if (row) {
                        io.emit('device_setting_receive_' + row.st_serial, row);
                    } else if (err) {
                        console.log('ajax data insert error : ', err.stack);
                    } else {
                        console.log('null');
                    }
                });
            });
        }

    });

    //센서정보 저장
    socket.on('sensor_data_request', function(data) {
        console.log("socket : " + data);
        dataControllers.insert_data(data, function(row, err) {
            if (row) {
                io.emit('sensor_data_receive_' + data.sd_serial, { msg: 1 });
            } else if (err) {
                console.log('ajax data insert error : ', err.stack);
            } else {
                console.log('null');
            }
        });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var index = require('./Server/routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, './Server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret my key',
    resave: false,
    saveUninitialized: true,
}));

//get public folder url (css, javascript, bootstrap)
app.use('/static', express.static(path.join(__dirname, 'public')));
//get camera image url
app.use('/images', express.static(path.join(__dirname, 'camera_images')));
//get upload file url
app.use('/upload', express.static(path.join(__dirname, 'upload')));
//zip file download
app.use('/zipdownload', express.static(path.join(__dirname, 'download')));
//index router
app.use('/test', index);
//testing router
var test = require('./Server/routes/test_router');
app.use('/', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('./error/404');
    //next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log('error : ', err.stack);
    // render the error page
    res.status(err.status || 500);
    res.render('./error/500');
});

module.exports = app;