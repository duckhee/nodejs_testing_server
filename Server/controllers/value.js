var models = requrie('../models/index.js');
var Value = requrie('../models/values.js');

exports.insert_data = function(data_info, callback) {
    models.Value.create({}).then(function(row) {

    }).catch(function(e) {

    });
};

exports.list_data = function(data_info, callback) {
    models.Value.findAll({}).then(function(row) {

    }).catch(function(e) {

    });
};

exports.findOne_data = function(data_info, callback) {
    models.Value.find({}).then(function(row) {

    }).catch(function(e) {

    });
}

exports.delete_data = function(data_info, callback) {
    models.Value.destory({}).then(function(row) {

    }).catch(function(e) {

    });
}