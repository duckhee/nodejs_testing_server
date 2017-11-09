var models = requrie('../models/index.js');
var Value = requrie('../models/values.js');
var excel = require('excel4node');

exports.insert_data = function(data_info, callback) {
    models.Value.create({

    }).then(function(row) {

    }).catch(function(e) {

    });
};

//limit 10 data
exports.list_data = function(data_info, callback) {
    models.Value.findAll({
        where: {},
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10,
    }).then(function(row) {

    }).catch(function(e) {

    });
};

//all data show
exports.all_data = function(data_info, callback) {
    models.Value.findAll({
        where: {},
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(rows) {
        callback(row, null);

    }).catch(function(e) {
        callback(null, e);
    });
};
//find one data
exports.findOne_data = function(data_info, callback) {
    models.Value.find({
        where: {},
    }).then(function(row) {

    }).catch(function(e) {

    });
};
//delete data
exports.delete_data = function(data_info, callback) {
    models.Value.destory({
        where: {},
    }).then(function(row) {

    }).catch(function(e) {

    });
};

var wb1 = new excel.Workbook();
var ws = wb1.addWorksheet('sheet1');

//make exel file 
exports.make_exel = function(data_info, callback) {
    all_data(data_info, function(row, err) {
        if (row) {

        } else if (err) {

        } else {

        }
    });
};