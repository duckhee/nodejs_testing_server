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