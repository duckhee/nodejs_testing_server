var models = require('../models/index');
var seosan_images = require('../models/seosan_images');

//insert camera_data callback(row, err);
exports.create_image = function(image_info, callback) {
    models.seosan_images.create({
        si_serial: image_info.si_serial,
        si_path: image_info.si_path,
        si_filename: image_info.si_filename,
        si_filesize: image_info.si_filesize,
        createdAt: image_info.createdAt,
        updatedAt: image_info.updatedAt
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
        //  createdAt: image_info.createdAt,
        //  updatedAt: image_info.updatedAt
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    })
};

//find camera info callback(row, err)
exports.find_camera = function(camera_info, callback) {
    models.seosan_images.find({
        where: {
            si_serial: camera_info.si_serial //'01171030130408'
        },
        order: [
            ['updatedAt', 'DESC']
        ]
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