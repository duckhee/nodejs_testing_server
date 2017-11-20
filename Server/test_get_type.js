//var controller = require('./controllers/data_controller');
var file_util = require('./util/file');

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
var folder_info = { "si_serial": 1, "si_path": 1 };
file_util.folder_zipping(folder_info, function(err) {
    if (err) {
        console.log(err.stack);
    } else {
        console.log('success');
    }
})
process.exit();