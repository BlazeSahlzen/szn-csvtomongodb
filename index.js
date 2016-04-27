'use strict';

/**
 * [csvtomongodb description]
 */
var csvtomongodb = require('./lib');

/**
 * The file path leading to CSV file
 * @type {String}
 */
var filePath = "./samples/propertyRating-insertion.csv"; // sensitive to change

/**
 * The CSVtoMongoDB mapping table
 * @type {Object}
 */
var mappingTable = require("./maps/propertyRating_insertion_map");

/**
 * MongoDB config and schema information
 * @type {Object}
 */
// var db = {
//     config: {},
//     schema: require("")
// };

csvtomongodb({
    filePath: filePath,
    mappingTable: mappingTable,
    // db: db
});
