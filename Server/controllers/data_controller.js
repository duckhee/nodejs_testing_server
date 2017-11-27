var models = require('../models/index');
var seosan_data = require('../models/seosan_data.js');

//insert data callback(row, err);
exports.create_data = function(data_info, callback) {
    models.seosan_data.create({
        sd_address: data_info.sd_address,
        sd_serial: data_info.sd_serial,
        sd_data: data_info.sd_data,
    }).then(function(row) {
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};


//insert data callback(row, err);
exports.insert_data = function(data_info, callback) {
    models.seosan_data.create({
        sd_address: data_info.sd_address,
        sd_serial: data_info.sd_serial,
        sd_data: data_info.sd_data,
        createdAt: data_info.createdAt,
        updatedAt: data_info.updatedAt
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
            sd_serial: data_info.sd_serial
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
            sd_serial: data_info.sd_serial //'01171030130408'
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
            sd_serial: data_info.serial_Num
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
            sd_serial: data_info.serial_Num
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
            // sd_serial: data_info.serial_Num
            sd_serial: data_info.sd_serial //'01171030130408'
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

exports.get_address_data = function(data_info, callback) {
    models.seosan_data.findAll({
        where: {
            sd_address: data_info.address_Num
        },
        order: [
            ['createdAt', 'DESC']
        ],
    }).then(function(rows) {
        callback(rows, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
}

exports.get_test_data = function(data_info, callback) {
    models.seosan_data.findAll({
        where: {
            sd_serial: data_info.sd_serial //'01171030130408'
        },
        order: [
            ['createdAt', 'DESC']
        ],
    }).then(function(rows) {
        callback(rows, null);
    }).catch(function(er) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
};
//check last data
exports.check_connection = function(serial, callback) {
        models.seosan_data.find({
            where: {
                sd_serial: serial
            },
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: ['sd_serial', 'createdAt'],
            /*
            $and:[ 
                        models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '>=', camera_info.startDate), 
                        models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '<=', camera_info.endDate)             
                ],
                */
            /*       
            $notBetween: [
                       models.sequelize.where(models.sequelize.fn('HOUR', models.sequelize.col('createdAt')), '>=', 22),
                       models.sequelize.where(models.sequelize.fn('HOUR', models.sequelize.col('createdAt')), '<=', 9)
                   ] 
                   */
        }).then(function(row) {
            //console.log('check connection : ', row);
            callback(row, null);
        }).catch(function(err) {
            console.log('error : ', err.stack);
            callback(null, err);
        });
    }
    /*
        test controllers
     */
    //check last data
exports.test_check_connection = function(serial, callback) {
    models.seosan_data.find({
        where: {
            sd_serial: serial
        },
        order: [
            ['createdAt', 'DESC']
        ],
        attributes: ['sd_serial', 'createdAt'],
        /*
        $and:[ 
                    models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '>=', camera_info.startDate), 
                    models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '<=', camera_info.endDate)             
            ],
            */
        /*
        $notBetween: [
            models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '>=', new Date()),
            models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '<=', new Date())
        ]
        */
        /*
        $Between: [
            models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '<=', ),
            models.sequelize.where(models.sequelize.fn('date', models.sequelize.col('createdAt')), '<=', 3)
        ]
        */
    }).then(function(row) {
        //console.log('check connection : ', row);
        // console.log('testtest::::', row);
        callback(row, null);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(null, err);
    });
}