// //var controller = require('./controllers/data_controller');
// var file_util = require('./util/file');
// var imageController = require('./controllers/camera_controller');
// var dataController = require('./controllers/data_controller');
// var settingController = require('./controllers/setting_controller');
// var mysql = require('mysql2');
// var moment = require('moment');

// //var models = { "address_Num": "013EP100G-08" };

// // controller.get_address_data(models, function(row, err) {
// //     if (row) {
// //         console.log('get type : ', typeof(row));

// //         for (var i in row) {
// //             var array = row[i].dataValues.sd_data.split(',');
// //             console.log('first data : ', row[i].dataValues.id);
// //             for (var j in array) {
// //                 //console.log('array type : ', typeof(array[j]));
// //                 //console.log('array ' + j + ' : ', array[j]);
// //                 if (j < 8) {
// //                     console.log('ec ' + j + ': ', array[j]);
// //                 } else if (j < 16) {
// //                     console.log('온도 ' + j + ' : ', array[j]);
// //                 } else {
// //                     console.log('수분 ' + j + ' : ', array[j]);
// //                 }
// //             }
// //         }
// //         //console.log('data : ', row);
// //     } else if (err) {
// //         console.log('error : ', err.stack);
// //     } else {
// //         console.log('null');
// //     }
// // });
// console.log('test');

// settingController.get_serial(function(row, err) {

//     var test = new Array();
//     var data_info;
//     if (row) {
//         // console.log('serial : ', row);
//         for (var i in row) {
//             test[i] = row[i].st_serial;
//             console.log('row : ', row[i].st_serial);
//         }
//     } else if (err) {
//         console.log('error : ', err.stack);
//     } else {
//         console.log('null');
//     }
//     for (var i = 0; i < test.length; i++) {
//         //console.log('send serial :::::::::::' + i, test[i]);
//         dataController.test_check_connection(test[i], function(row, err) {
//             if (row) {
//                 //console.log('row :::::::: ', row);
//                 // console.log('setting serial ::::: ', row.dataValues.sd_serial);
//                 var now_data = new Date();
//                 var get_date = String(row.dataValues.createdAt).split('GMT');
//                 var set_date = new Date(get_date[0]);
//                 console.log('test     : ', set_date);
//                 console.log('now date : ', now_data);

//                 console.log(row.dataValues.sd_serial + ' : ' + row.dataValues.createdAt);
//                 // console.log('-------------', set_date - now_date);
//                 data_info = { "serial": row.dataValues.sd_serial, "createdAt": row.dataValues.createdAt }
//                 console.log('data info : ', data_info.serial);
//                 console.log('data info time : ', data_info.createdAt);

//                 ///////////////////////////////////////////////////////////
//                 var now_month = new Date().getMonth() + 1;
//                 var now_date = new Date().getDate();


//                 var get_month = new Date(data_info.createdAt).getMonth() + 1;
//                 var get_date = new Date(data_info.createdAt).getDate();


//                 console.log('local time spilt : ', now_month);
//                 console.log('local time spilt : ', now_date);
//                 console.log('local time spilt : ', now_hour);

//                 console.log('time split : ', get_month);
//                 console.log('time split : ', get_date);
//                 console.log('time split : ', get_hour);
//                 if (now_month !== get_month || now_date >= get_date >= now_date - 1) {
//                     console.log('wrong');
//                 }

//             } else if (err) {
//                 console.log('error : ', err.stack);
//             } else {
//                 console.log('null');

//             }
//         });
//     }

//     //process.exit();
//     //process.exit();
// });

var datea = new Date();
var con = datea.setMinutes(30);
var comm = datea.getMinutes();
console.log(datea);