var models = require('../models/index');
var Camera = require('../models/camera');


exports.insert_picture = function(camera_info, callback) {

    models.Camera.create({
        field_id: camera_info.field_id,
        folder_name: camera_info.folder_path,
        img_name: camera_info.img_name
    }).then(function(row) {
        callback(null, row);
    }).catch(function(e) {
        callback(e, null);
    });
};

exports.slide_list = function(camera_info, callback) {
    models.Camera.findAll({
        where: {
            field_id: camera_info.field_id,
            createdAt: {
                between: [camera_info.startDate, camera_info.endDate]
            },
            /*$and:[ 
                    models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '>=', camera_info.startDate), 
                    models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '<=', camera_info.endDate)             
            ],*/
            $or: [
                models.sequelize.where(models.sequelize.fn('HOUR', models.sequelize.col('createdAt')), '>=', 22),
                models.sequelize.where(models.sequelize.fn('HOUR', models.sequelize.col('createdAt')), '<=', 9)
            ]
        },
        order: [
            // Will escape username and validate DESC against a list of valid direction parameters
            ['createdAt', 'ASC']
        ]

    }).then(function(Camera) {
        //console.log(values);
        return callback(null, Camera);
    }).catch(function(err) {
        console.log('error');
        console.log(err.stack);
        return callback(err, null);
        //throw err;
    });
};

exports.create_picture = function(camera_info, callback) {
    //console.log(camera_info);
    // console.log('camera info field id' + camera_info.field_id);
    //console.log('camera info folder path' + camera_info.folder_path);
    //console.log('camera info img name ' + camera_info.img_name);

    models.Camera.findOrCreate({
        where: {},
        default: {
            folder_name: camera_info.folder_path,
            img_name: camera_info.img_name
        }
    }).then(function(rows) {}).catch(function(e) {
        callback(e, null);
    });
};

exports.find_picture = function(camera_info, callback) {
    models.Camera.find({
        where: {
            field_id: camera_info.field_id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(row) {
        callback(null, row);
    }).catch(function(e) {
        callback(e, null);
    });
};