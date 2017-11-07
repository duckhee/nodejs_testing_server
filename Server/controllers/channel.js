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
    models.Channels.findAll({}).then(function(row) {

    }).catch(function(e) {

    });
};

//find one channel
exports.find_channel = function(channel_info, callback) {
    models.Channel.find({}).then(function(row) {

    }).then(function(e) {

    });
};

//delete channel
exports.delete_channel = function(channel_info, callback) {
    models.Channel.destory({}).then(function(row) {

    }).catch(function(e) {

    });
};