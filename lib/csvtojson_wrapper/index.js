'use strict';

/**
 * Wrapper around csvtojson package
 * @param  {String} csvPath     Path to the CSV file to be converted to JSON
 * @param  {Function} handler   Function to handle each record in the CSV file
 * @param  {Function} callback  Function to call CSV file is completely parsed
 */
function csvtojson_wrapper(csvPath, handler, callback) {
    ////////////////////////
    // Parameter checking //
    ////////////////////////
    if (typeof csvPath !== "string") {
        throw new Error("File path must be string!");
    }

    if (typeof handler !== "function") {
        throw new Error("Handler must be function!");
    }
    
    if (typeof callback !== "function") {
        throw new Error("Callback must be function!");
    }

    ///////////////////////////////////////////////////////////////////////
    // Using csvtojson package (https://www.npmjs.com/package/csvtojson) //
    ///////////////////////////////////////////////////////////////////////
    var csvtojson = new(require('csvtojson').Converter)({
        constructResult: false, // whether to construct the result json or not
        workerNum: 2, // number of CPU cores to use
        checkType: false // whether to automatically convert from String to other types where applicable
    });

    ///////////////////////////////////////////////////////////////////////////
    // Attaching the handler to the record_parsed event emitted by csvtojson //
    ///////////////////////////////////////////////////////////////////////////
    csvtojson.on('record_parsed', handler);

    /////////////////////////////////////////////////////////////////////////
    // Attaching the callback to the end_parsed event emitted by csvtojson //
    /////////////////////////////////////////////////////////////////////////
    csvtojson.on('end_parsed', callback);

    //////////////////////////////////////////////////////////////
    // Reads the file and pipes the output to csvtojson wrapper //
    //////////////////////////////////////////////////////////////
    require('fs')
        .createReadStream(csvPath)
        .pipe(csvtojson);
};

module.exports = csvtojson_wrapper;
