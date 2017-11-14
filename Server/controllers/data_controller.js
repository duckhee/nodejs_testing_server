var models = require('../models/index');
var seosan_data = requrie('../models/seosan_data.js');


//insert data callback(row, err);
exports.insert_data = function(data_info, callback) {
    models.seosan_data.findOrCreate({
        where: {

        },
        default: {

        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    })
};

//list data all callback(rows, err);
exports.list_data = function(data_info, callback) {
    models.seosan_data.findAll({
        where: {

        },
        order: [
            ['createdAt', 'DESC']
        ],
    }).then(function(rows) {
        callback(rows, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    })
};

//view web limit show data callback(rows, err);
exports.list_limit = function(data_info, callback) {
    models.seosan_data.findAll({
        where: {
            sd_serial: data_info.serial_Num
        },
        limit: 10,
        order: [
            ['createdAt', 'DESC']
        ],
    }).then(function(rows) {
        callback(rows, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//find one data callback(row, err);
exports.find_Onedata = function(data_info, callback) {
    models.seosan_data.find({
        where: {

        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    })
};

//delete data callback(row, err);
exports.delete_data = function(data_info, callback) {
    models.seosan_data.destroy({
        where: {

        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    })
};

//download data info callback(row, err);
exports.download_data = function(data_info, callback) {
    models.seosan_data.findAll({
        where: {
            sd_serial: data_info.sd_serial
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(rows) {
        callback(rows, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};