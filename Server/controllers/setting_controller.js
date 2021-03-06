var models = require('../models/index');
var seosan_setting = require('../models/seosan_setting');

//setting insert callback(row, err);
exports.create_setting = function(setting_info, callback) {
    models.seosan_setting.findOrCreate({
        where:{
            st_serial: setting_info.st_serial
        },
        default:{
            st_serial: setting_info.st_serial,
            st_address: setting_info.st_address,
            st_title: setting_info.st_title,
            st_gps: setting_info.st_gps,
            st_group: setting_info.st_group
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

    //변경사항만 가져오기
    //    var changing = {};

    models.seosan_setting.update({
        st_gps: setting_info.st_gps,
        st_title: setting_info.st_title,
        //st_address: setting_info.address,
        st_group: setting_info.st_group
    }, {
        where: {
            st_serial: setting_info.st_serial
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
            st_serial: setting_info.st_serial
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
            st_serial: setting_info.st_serial
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
            st_serial: setting_info.st_serial
        }
    }).then(function(rows) {
        callback(rows, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};


//group device callback(row, err) models attribute로 해결이 가능하다. 더 알아보기 
exports.group_device = function(callback) {
    models.seosan_setting.findAll({
        attributes: ['st_serial'],
        group: ['st_serial'],
    }).then(function(rows) {
        callback(rows, null);
    }).catch(function(err) {
        console.log('group error : ', err.stack);
        callback(null, err);
    });
}

//get serial number callback(row, err)
exports.get_serial = function(callback) {
    models.seosan_setting.findAll({
        attributes: ['st_serial'],
        order: [
            ['createdAt', 'DESC']
        ],
        group: ['st_serial']
    }).then(function(row) {
        //console.log(row);
        callback(row, null);
    }).catch(function(err) {
        callback(null, err);
    });
}