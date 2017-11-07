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

//file zip file_info{name} callback
exports.file_zip = function(file_info, callback) {

};

//folder zip
exports.folder_zip = function(folder_info, callback) {
    var folder_name = folder_info.name;
    //folder location found and zip
    folder_zip.zipFolder(process.cwd() + '/camera_images/' + folder_info.channel + '/' + folder_info.name, process.cwd() + '/download/' + folder_info.channel + '/' + folder_info.name, function(err) {
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

//make log file
exports.file_csv = function(file_info, callback) {

};