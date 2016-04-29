'use strict';

/**
 * Generates unique IDs for each query (for tracking)
 */
var uuid = require('uuid');

/**
 * Wrapper around csvtojson npm module
 */
var csvtojson_wrapper = require('./csvtojson_wrapper');

/**
 * Maps the JSON-object to the mapping-table provided and generates intermediate queries
 */
var intermediate_query_generator = require('./intermediate_query_generator');

/**
 * Checks for dependency fulfillment of intermediate queries from the database
 */
var dependency_checker = require('./dependency_checker');

/**
 * Resolves all dependencies
 */
var dependency_resolver = require('./dependency_resolver');

/**
 * Generates MongoDB queries from resolved intermediate-queries
 */
var query_generator = require('./query_generator');

/**
 * Executes the queries on MongoDB
 */
var query_executor = require('./query_executor');

/*-----------------------------------------------------------*/

var statusCodes = {
    0: 'error',
    1: 'intermediate-query-generated',
    2: 'intermediate-query-has-dependency',
    3: 'intermediate-query-dependency-resolved',
    4: 'query-generated',
    5: 'query-executed'
};

/*-----------------------------------------------------------*/

/**
 * Contains all information required for generating queries
 * @type {Object}
 */
var queryInformationTable = {
    /**
     * List of intermediate queries
     * @type {[Object]}
     */
    intermediateQueries: {},

    /**
     * Internal State Table storing information about the queries
     * @type {Object}
     */
    internalStateTable: {},

    /**
     * Dependencies list storing information about the query dependencies
     * @type {Object}
     */
    dependencies: {},

    /**
     * Mapping table to convert from CSV to MongoDB query
     * @type {Object}
     */
    mappingTable: {},

    /**
     * Contains reference to server/app instance
     */
    app: null,

    /**
     * Contains reference to callback
     */
    callback: null
};

/**
 * Function to invoke when each CSV record is parsed into simple-JSON object
 * @param  {Object} jsonObject The simple JSON object
 */
var onRecordParsed = function(jsonObject) {

    /**
     * The intermediate query object
     * @type {Object}
     */
    var intermediateQuery = intermediate_query_generator.apply(queryInformationTable, [jsonObject]);

    /**
     * To check for dependencies in intermediate queries and push into dependencies list
     */
    dependency_checker.apply(queryInformationTable, [intermediateQuery]);

};

/**
 * Function to invoke when all CSV records have been parsed into simple-JSON objects
 */
var onEndParsed = function() {

    /**
     * To (BULK) resolve the dependencies
     */
    dependency_resolver.apply(queryInformationTable, [

        function() {
            /**
             * To (BULK) generate queries from intermediate queries and resolved dependencies
             */
            query_generator.apply(queryInformationTable, []);

            /**
             * To (BULK) execute all queries
             */
            // query_executor.apply(queryInformationTable, []);
        }
        
    ]);



};

/**
 * Function to generate and execute MongoDB queries from CSV-records
 * @param  {Object}   options     Mapping table, file-path to CSV file and DB config object
 * @param  {Function} callback    The callback function to call when operation is finished
 */
var csvtomongodb = function(options, callback) {

    if (!options.mappingTable) {

        throw new Error("Mapping table required!");

    } else {

        queryInformationTable.mappingTable = options.mappingTable;

    }


    if (!options.csvPath) {

        throw new Error("CSV file path requried!");

    } else {

        queryInformationTable.csvPath = options.csvPath;

    }


    if (!options.app) {

        throw new Error("Requires the server/app instance!");

    } else {

        queryInformationTable.app = options.app;

    }


    if (!callback) {

        throw new Error("Requires a callback!");

    } else {

        queryInformationTable.callback = callback;

    }

    return (new csvtojson_wrapper(options.csvPath, onRecordParsed, onEndParsed));

};

module.exports = csvtomongodb;
