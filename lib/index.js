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
 * Generates MongoDB queries from intermediate-queries
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
    2: 'intermediate-query-dependency-checked',
    3: 'intermediate-query-waiting',
    4: 'query-generated',
    5: 'query-executed',
};

/*-----------------------------------------------------------*/

/**
 * Contains all information required for generating queries
 * @type {Object}
 */
var intermediateQueryInformationTable = {
    /**
     * List of intermediate queries
     * @type {[Object]}
     */
    intermediateQueries: [],

    /**
     * Internal State Table storing information about the queries
     * @type {Object}
     */
    internalStateTable: {}
};

/**
 * Variable to store reference to intermediate query generator module
 */
var intermediateQueryGenerator;

/**
 * The function to invoke for generating intermediate query object from simple-JSON
 * @param  {Object} jsonObject JSON object parsed from CSV data
 * @return {Object}            The intermediate query object
 */
var intermediateQueryGeneratorFunction = function(jsonObject) {

    var id = uuid.v4();

    var intermediateQuery = {
        uuid: id,
        mapping: [],
        options: this.mappingTable.options
    };

    for (var key in jsonObject) {
        intermediateQuery.mapping.push({
            csv_key: key,
            csv_value: jsonObject[key],
            map: this.mappingTable.mapping[key]
        });
    }

    this.intermediateQueryInformationTable.internalStateTable[id] = {
        uuid: id,
        status: 1
    };

    return intermediateQuery;

};

/**
 * Function to invoke when each CSV record is parsed into simple-JSON object
 * @param  {Object} jsonObject The simple JSON object
 */
var onRecordParsed = function(jsonObject) {

    intermediateQueryGenerator.generate(jsonObject);

};

/**
 * Function to invoke when all CSV records have been parsed into simple-JSON objects
 */
var onEndParsed = function() {

    dependency_checker.apply(intermediateQueryInformationTable, []);

    query_generator.apply(intermediateQueryInformationTable, []);

    query_executor.apply(intermediateQueryInformationTable, []);

    console.log(JSON.stringify(intermediateQueryInformationTable.intermediateQueries));

    console.log(intermediateQueryInformationTable.internalStateTable);

};

/**
 * Function to generate and execute MongoDB queries from CSV-records
 * @param  {Object} options Mapping table, file-path to CSV file and DB config object
 * @return {Object}         The final output
 */
var csvtomongodb = function(options) {

    intermediateQueryGenerator = new intermediate_query_generator(options.mappingTable, intermediateQueryInformationTable, intermediateQueryGeneratorFunction);

    return (new csvtojson_wrapper(options.filePath, onRecordParsed, onEndParsed));

};

module.exports = csvtomongodb;
