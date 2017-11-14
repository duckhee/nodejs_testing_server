var models = require('../models/index');
var Channel = require('../models/channel');

//create channel
exports.insert_channel = function(channel_info, callback) {
    models.Channel.findOrCreate({
        where: {},
        default: {

        }
    }).then(function(row) {

    }).catch(function(e) {

    });
};

//find all list
exports.list_channel = function(channel_info, callback) {
    models.Channels.findAll({
        where: {

        },
    }).then(function(row) {

    }).catch(function(e) {

    });
};

//find one channel
exports.find_channel = function(channel_info, callback) {
    models.Channel.find({

    }).then(function(row) {

    }).then(function(e) {

    });
};

//delete channel
exports.delete_channel = function(channel_info, callback) {
    models.Channel.destroy({

    }).then(function(row) {
        console.log('success : ', row);
        callback(null, row);
    }).catch(function(e) {
        console.log('error : ', err.stack);
        callback(err, null);
    });
};