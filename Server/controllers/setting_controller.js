var models = require('../models/index');
var seosan_setting = require('../models/seosan_setting');

//setting insert callback(row, err);
exports.create_setting = function(setting_info, callback) {
    models.seosan_setting.findOrCreate({
        where: {

        },
        default: {

        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//update setting callback(row, err);
exports.update_setting = function(setting_info, callback) {
    models.seosan_setting.update({

    }, {
        where: {
            st_serial: setting_info.serial_Num
        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//delete setting callback(row, err);
exports.delete_setting = function(setting_info, callback) {
    models.seosan_setting.destroy({
        where: {

        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//show setting one callback(row, err);
exports.find_setting = function(setting_info, callback) {
    models.seosan_setting.find({
        where: {

        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//show setting callback(rows, err);
exports.all_setting = function(setting_info, callback) {
    models.seosan_setting.findAll({
        where: {

        }
    }).then(function(rows) {
        callback(rows, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};