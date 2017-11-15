var controller = require('./controllers/data_controller');

var models = { "address_Num": "013EP100G-08" };

controller.get_address_data(models, function(row, err) {
    if (row) {
        console.log('get type : ', typeof(row));
        console.log('data : ', row);
    } else if (err) {
        console.log('error : ', err.stack);
    } else {
        console.log('null');
    }
});