var controller = require('./controllers/data_controller');

var models = { "address_Num": "013EP100G-08" };

controller.get_address_data(models, function(row, err) {
    if (row) {
        console.log('get type : ', typeof(row));
        var array;
        for (var i in row) {
            array = row[i].dataValues.sd_data.split(',');
        }
        console.log('data : ', row);
        test_string = JSON.stringify(array);
        console.log('array type : ', typeof(array));
        console.log('array : ', array);
        console.log('test string : ', typeof(test_string));
        console.log('test string : ', test_string);
    } else if (err) {
        console.log('error : ', err.stack);
    } else {
        console.log('null');
    }
    process.exit();
});