var models = require('../models/index');
var seosan_images = require('../models/seosan_images');

//insert camera_data callback(row, err);
exports.create_image = function(image_info, callback) {
    models.seosan_images.create({
        si_serial: image_info.si_serial,
        si_path: image_info.si_path,
        si_filename: image_info.si_filename,
        si_filesize: image_info.si_filesize,
        createdAt: createdAt,
        updatedAt: updatedAt
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};


//insert camera_info callback(row, err);
exports.insert_image = function(image_info, callback) {
    models.seosan_images.create({
        si_serial: image_info.si_serial,
        si_path: image_info.si_path,
        si_filename: image_info.si_filename,
        si_filesize: image_info.si_filesize,
        createdAt: createdAt,
        updatedAt: updatedAt
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    })
};

//web camera info slide callback(row, err)
exports.slide_list = function(camera_info, callback) {
    models.seosan_images.findAll({
        where: {

        },
        createdAt: {
            between: [camera_info.startDate, camera_info.endDate]
        },
        $or: [

        ],
        order: [
            ['createdAt', 'ASC']
        ]
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//find camera info callback(row, err)
exports.find_camera = function(camera_info, callback) {
    models.seosan_images.find({
        where: {
            si_serial: camera_info.si_serial //'01171030130408'
        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};

//delete camera info callback(row, err)
exports.delete_camera = function(camera_info, callback) {
    models.seosan_images.destroy({
        where: {
            si_serial: camera_info.serial_Num
        }
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};