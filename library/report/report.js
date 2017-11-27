var mailer = require('nodemailer');
var config = require('../config.json');
var transporter = mailer.createTransport(config.mail);
var server_error = 'server error report : ';

var mail_option = {
    from: 'IOT Server report <' + config.mail.auth.user + '>',
    to: 'fain9301@yahoo.com',
    subject: 'server error report'
};
//check network connection module
var check = require('../../Server/controllers/network_controller');

//error 발생시에 에러 정보를 받아서 전송을 해준다. callback(info, err);
exports.send_error = function(err_data, callback) {
    server_error += err_data;
    mail_option.text = server_error;
    transporter.sendMail(mail_option, function(err, info) {
        if (err) {
            console.log("could not send report : ");
            console.log(server_error);
            transporter.close();
            callback(null, err);
        } else if (info) {
            console.log("message %s and :%s", info.messageId, info.response);
            transporter.close();
            callback(info, null);

        } else {
            console.log('null');
            callback(null, null);
        }
    });
};

//연결 시간알려주는 것 어떻게 알려줄지 정하기 callback(info, err);
exports.connection_report = function(connection_info, callback) {
    var connection_report =
        'connection report : serial number - ' + connection_info.serial_Num +
        '\nlast send data time - ' + connection_info.last_Time;
    mail_option.text = connection_report;
    transporter.sendMail(mail_option, function(err, info) {
        if (err) {
            console.log('send mail error : ', err.stack);
            transporter.close();
            callback(null, err);
        } else if (info) {
            console.log('send mail success : ', info);
            transporter.close();
            callback(info, null);
        } else {
            console.log('null');
            callback(null, null);
        }
    });
};

//connection test report all serial testing
exports.connected_test = function(callback) {
    check.check_connection(function(row, err) {
        if (row) {
            //for 문으로 serial 정보 찾기 
            var not_connect;
            //last connection time 
            for (var i in row) {
                //날짜 체크해서 추가할지 말지 적용
                not_connect += 'serial number - ' + row[i].sd_serial +
                    ' connected last time' + row[i].createdAt + '\n';
            }

            // var connection_report =
            //     'connection report : serial number - ' +
            //     connection_info.serial_Num +
            //     '\nlast send data time - ' +
            //     connection_info.last_Time;
            // mail_option.text = connection_report;
            var connection_report = not_connect;
            transporter.sendMail(mail_option, function(err, info) {
                if (err) {
                    console.log('send mail error : ', err.stack);
                    transporter.close();
                    callback(null, err);
                } else if (info) {
                    console.log('send mail success : ', info);
                    transporter.close();
                    callback(info, null);
                } else {
                    console.log('null');
                    callback(null, null);
                }
            });
        } else if (err) {
            console.log('error : ', err.stack);
            callback(null, err);
        } else {
            console.log('null');
            callback(null, err);
        }
    });
};