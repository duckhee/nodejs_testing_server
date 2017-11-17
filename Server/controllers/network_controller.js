var models = require('../models/index');
var seosan_network = require('../models/seosan_network');

/*
 *  model :
 *         id,
 *         sn_serial,
 *         sn_address,
 *         sn_type,
 *         createdAt,
 *         updatedAt 
 */


//insert data callback(row, err);
exports.create_network = function(network_info, callback) {
    models.seosan_network.create({
        sn_serial: network_info.sn_serial,
        sn_address: network_info.sn_address,
        sn_type: network_info.sn_type
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};


//insert network data callback(row, err);
exports.insert_network = function(network_info, callback) {
    models.seosan_network.findOrCreate({
        where: {

        },
        default: {
            sn_serial: network_info.sn_serial,
            sn_address: network_info.sn_address,
            sn_type: network_info.sn_type
        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    })
};

//find network callback(row, err);
exports.find_network = function(network_info, callback) {
    models.seosan_network.find({
        where: {
            sn_serial: network_info.sn_serial
        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//find all network callback(row, err);
exports.all_network = function(network_info, callback) {
    models.seosan_network.findAll({
        where: {
            sn_serial: network_info.sn_serial
        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//all device check connection ??? callback(row, err)
exports.all_test_network = function(network_info, callback) {
    models.seosan_network.findAll({

    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//delete network data callback(row, err)
exports.delete_network = function(network_info, callback) {
    models.seosan_network.destroy({
        where: {
            sn_serial: network_info.sn_serial
        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};