var controller = require('./controllers/data_controller');

var models = { "address_Num": "013EP100G-08" };

controller.get_address_data(models, function(row, err) {
    if (row) {
        console.log('get type : ', typeof(row));

        for (var i in row) {
            var array = row[i].dataValues.sd_data.split(',');
            for (var j in array) {
                //console.log('array type : ', typeof(array[j]));
                console.log('array : ' + j, array[j]);
            }

        }
        //console.log('data : ', row);
    } else if (err) {
        console.log('error : ', err.stack);
    } else {
        console.log('null');
    }
    process.exit();
});