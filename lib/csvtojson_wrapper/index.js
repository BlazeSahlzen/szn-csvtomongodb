'use strict';

/**
 * Wrapper around csvtojson package
 * @param  {String} filePath Path to the CSV file to be converted to JSON
 * @param  {Function} handler  Function to handle each record in the CSV file
 * @param  {Function} callback  Function to call CSV file is completely parsed
 */
function csvtojson_wrapper(filePath, handler, callback) {

    if (filePath) {

        if (typeof filePath !== "string") {

            throw new Error("File path must be string!");

        }

        this.filePath = filePath;

    } else {

        this.filePath = "";

    }

    if (handler) {

        if (typeof handler !== "function") {

            throw new Error("Handler must be function!");

        }

        this.handler = handler;

    } else {

        this.handler = null;

    }

    if (callback) {

        if (typeof callback !== "function") {

            throw new Error("Callback must be function!");

        }

        this.callback = callback;

    } else {

        throw new Error("No callback provided!");

    }

    ///////////////////////////////////////////////////////////////////////
    // Using csvtojson package (https://www.npmjs.com/package/csvtojson) //
    ///////////////////////////////////////////////////////////////////////

    this.csvtojson = new(require('csvtojson').Converter)({
        constructResult: false, // whether to construct the result json or not
        workerNum: 2, // number of CPU cores to use
        checkType: false // whether to automatically convert from String to other types where applicable
    });

    //////////////////////////////////////////////////////////////////////////////////////
    // Special case where both handler and file are provided, thus, execute immediately //
    //////////////////////////////////////////////////////////////////////////////////////

    if (this.handler && this.filePath) {

        this.attachHandler(this.handler);
        this.readFile(this.filePath);

    }

};

/**
 * Attaches a handler to this wrapper object. Replaces any handler previously attached!
 * @param  {Function} handler Function to handle each record in the CSV file
 */
csvtojson_wrapper.prototype.attachHandler = function(handler) {

    if (typeof handler === "function") {

        this.handler = handler;

    } else {

        throw new Error("Handler must be function!");

    }

};

/**
 * Sets the path to the CSV file and begins execution. Fails if handler is not attached!
 * @param  {String} filePath Path to the CSV file to be converted to JSON
 */
csvtojson_wrapper.prototype.readFile = function(filePath) {

    if (typeof filePath !== "string") {

        throw new Error("File path must be string!");

    }

    this.filePath = filePath;

    if (this.handler) {

        ///////////////////////////////////////////////////////////////////////////
        // Attaching the handler to the record_parsed event emitted by csvtojson //
        ///////////////////////////////////////////////////////////////////////////

        this.csvtojson.on('record_parsed', this.handler);

    } /*else { // NO NEED TO THROW AN ERROR

        throw new Error("No handler attached!");

    } */

    /////////////////////////////////////////////////////////////////////////
    // Attaching the callback to the end_parsed event emitted by csvtojson //
    /////////////////////////////////////////////////////////////////////////

    this.csvtojson.on('end_parsed', this.callback);

    //////////////////////////////////////////////////////////////
    // Reads the file and pipes the output to csvtojson wrapper //
    //////////////////////////////////////////////////////////////

    require('fs')
        .createReadStream(this.filePath)
        .pipe(this.csvtojson);

};

module.exports = csvtojson_wrapper;
