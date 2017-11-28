var settingController = require('./setting_controller');
var dataController = require('./data_controller');

//net work checking function callback(data_info, err) data_info = {"serial":, "createdAt":}
exports.check_network = function(callback) {
    var test = new Array();
    var now_date = new Date();
    settingController.get_serial(function(row, err) {
        if (row) {
            for (var i in row) {
                test[i] = row[i].st_serial;
            }
        } else if (err) {
            console.log('error : ', err.stack);
            callback(null, err);
        } else {
            console.log('null');
        }
        for (var i = 0; i < test.length; i++) {
            dataController.check_connection(test[i], function(row, err) {
                if (row) {
                    var data_info = {
                        "serial": row.dataValues.sd_serial,
                        "createdAt": row.dataValues.createdAt
                    }

                    var now_month = new Date().getMonth() + 1;
                    var now_date = new Date().getDate();

                    var get_month = new Date(data_info.createdAt).getMonth() + 1;
                    var get_date = new Date(data_info.createdAt).getDate();

                    if (now_month !== get_month || now_date >= get_date >= now_date - 1) {
                        callback(null, null);
                    } else {
                        callback(data_info, null);
                    }

                    //callback(data_info, null);
                } else if (err) {
                    console.log('error : ', err.stack);
                    callback(null, err);
                } else {
                    console.log('null');
                    callback(null, null);
                }
            });
        }
    });
}