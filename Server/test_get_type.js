//var controller = require('./controllers/data_controller');
var file_util = require('./util/file');
var imageController = require('./controllers/camera_controller');

//var models = { "address_Num": "013EP100G-08" };

// controller.get_address_data(models, function(row, err) {
//     if (row) {
//         console.log('get type : ', typeof(row));

//         for (var i in row) {
//             var array = row[i].dataValues.sd_data.split(',');
//             console.log('first data : ', row[i].dataValues.id);
//             for (var j in array) {
//                 //console.log('array type : ', typeof(array[j]));
//                 //console.log('array ' + j + ' : ', array[j]);
//                 if (j < 8) {
//                     console.log('ec ' + j + ': ', array[j]);
//                 } else if (j < 16) {
//                     console.log('온도 ' + j + ' : ', array[j]);
//                 } else {
//                     console.log('수분 ' + j + ' : ', array[j]);
//                 }
//             }
//         }
//         //console.log('data : ', row);
//     } else if (err) {
//         console.log('error : ', err.stack);
//     } else {
//         console.log('null');
//     }
// });
console.log('test');
var folder_info = {
    "si_serial": '01171030130408',
    "si_path": null
};
imageController.find_camera(folder_info, function(row, err) {
    console.log('find image ========');
    if (row) {
        console.log('row : ', row);
        folder_info.si_path = row.si_path;
        console.log('folder path : ', folder_info.si_path);
    } else if (err) {
        console.log(err.stack);
    }

    process.exit();
});