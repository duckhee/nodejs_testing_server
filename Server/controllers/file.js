/*
    file downlad
    file uplaod
    mysql file downlaod - data search and file make download
    zip image and zip location download
    file find
    folder zip
 */

var util = require('util');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var formidable = require('formidable');
var zip = require('node-zip');
var folder_zip = require('zip-folder');
//time module
var moment = require('moment');
var excel = require('excel4node');
//controller value 
var valueControllers = require('./value');

//file zip file_info{name} callback
exports.file_zip = function(file_info, callback) {

};

//folder zip
exports.folder_zip = function(folder_info, callback) {
    var folder_name = folder_info.name;
    //folder location found and zip
    folder_zip.zipFolder(process.cwd() + '/camera_images/' + folder_info.channel + '/' + folder_info.name, process.cwd() + '/download/' + folder_info.channel + '/' + folder_info.name + ',zip', function(err) {
        if (err) {
            console.log('failed make zip file', err.stack);
            callback(err);
        } else {
            console.loog('success');

            callback(null);
        }
    });
};

//find file
exports.file_find = function(file_info, callback) {
    var folder_path = file_info.folder;
    var file_name = file_info.name;
    fs.exists(process.cwd() + '/camera_images/' + folder_path + '/' + file_name + '.jpg', function(exists) {
        if (!exists) {
            console.log('not exist');
            callback(null);
        } else {
            console.log('exist');
            callback(exists);
        }
    });

};

//zip file download
exports.zip_downlaod = function(zip_info, callback) {

};

//file downlaod file_info{name} callback
exports.file_download = function(file_info, callback) {

};

//file upload file_info{} callback
// exports.file_upload = function(file_info, callback) {


// };


//make data file .csv
exports.file_csv = function(file_info, callback) {
    
        var csvfile = new excel.Workbook();
        //first sheet add file
        var first_sheet = csvfile.addWorksheet('sheet1');
        //sheet style set up
        var sheet_style = csvfile.createStyle({
            alignment: {
                horizontal: ['center'],
                vertical: ['center']
            },
            font: {
                size: 10,
                bold: false,
            },
            border: {
                left: {
                    style: 'thin',
                    color: '#000000'
                },
                right: {
                    style: 'thin',
                    color: '#000000'
                },
                top: {
                    style: 'thin',
                    color: '#000000'
                },
                bottom: {
                    style: 'thin',
                    color: '#000000'
                }
            }
        });
    
        /*
            column A : index
            column B : serial 
            column C : address
            column D : date
            column E ~  : value
            serial, address, value, date, index
        */
    
        //data 모두 가져오기 
        valueControllers.all_data(file_info, function(err, row) {
            if (row) {
                
                first_sheet.cell(1, 1).string("no").style(sheet_style);
                first_sheet.cell(1, 2).string("serial").style(sheet_style);
                first_sheet.cell(1, 3).string("address").style(sheet_style);
                first_sheet.cell(1, 4).string("date").style(sheet_style);
                
                var testing = row[1].dataValues.s_etc.split(',');
    
                //value title setting
                for (var j = 1; j <= testing.length; j++) {
                    first_sheet.cell(1, 4 + j).string("value" + j).style(sheet_style);
               }
                for (var i in row) {
                    //column width setting
                    //for문 하나
                    //cell에 number type이 들어가야해서 변환 
                    var Num_i = parseInt(i);
                    for (var j = 1; j <= 8; j++) {
                        if (j === 4) {
                            first_sheet.column(j).setWidth(44);
                        } else {
                            first_sheet.column(j).setWidth(20);
                        }
                    }
                    //for문 끝
                    //row height setting
                    //first_sheet.row(ii + 1).setHeight(10);
                    
                    ////////////////for 문 제어 필요///////
                    //번호 넣어주기
                    first_sheet.cell(Num_i + 2, 1).number(ii + 1).style(sheet_style);
                    
                    //serial 넣어주기
                    first_sheet.cell(Num_i + 2, 2).string(row[i].dataValues.s_id.toString()).style(sheet_style);
                    
                    //address 넣어주기
                    first_sheet.cell(Num_i + 2, 3).string(row[i].dataValues.s_addr.toString()).style(sheet_style);
                    
                    //date 넣어주기
                    first_sheet.cell(Num_i + 2, 4).string(row[i].dataValues.createdAt.toString()).style(sheet_style);
                    //data parser
                    var array = row[i].dataValues.s_etc.split(',');
                    //write data 
                    //여기서 부터 for문 하나
                     for (var a in array) {
                         //string을 number type으로 변환 
                         var Num_a=parseInt(a);
                         //write data
                         first_sheet.cell(Num_i+2, Num_a+5).string(array[a].toString()).style(sheet_style);
                     }
                     
                    //두번째 for문 끝
                }
    
                ////////////여기 까지 ////////////////
                var date = moment().format('YYYYMMDD');
                console.log('success ! ');
                //make csv file or download file 
                csvfile.write('download_date ' + date + '.csv', file_info.response);
                //만약 서버에 파일을 생성을 하고 싶으면 밑에 주석 풀고 위에 주석 처리
                //csvfile.write('download_date'+date+'.csv);
                callback(row, null);
            } else if (err) {
                console.log('error : ', err.stack);
                callback(null, err);
            } else {
                callback(null, null);
            }
        });
    
    };