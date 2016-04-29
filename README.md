# szn-csvtomongodb
Converting complex CSV files to JSON using csv-to-json npm package and then converting the JSON records into specified MongoDB schema forms before insertion or updation.

## TYPES OF AUTOMATED DATABASE OPERATIONS

1. Simple insert / update
  * requires nothing special

2. Replace 1 field with reference (same field name)
  * has dependency on another model
  * but field name remains the same

3. Replace 1 / more fields with reference (different field name)
  * has dependency on another model
  * field name will also change

4. Convert 1 / more fields into array of objects

5. Inserting / updating only some fields from csv 

6. Updating only some fields in the document (?)

## ALGORITHM FOR QUERY GENERATION

1. Loop through all intermediate queries (in the intermediate queries list)

2. Generate the query from the following rules:

  1. If a field has "ignore: true", then ignore the field, i.e., do not insert it into the query object

  2. If a field has a dependency, then check dependencies list for the resolved values

    1. If found, store it in the query object

    2. Else, throw error?

  3. If a field has "type: Number", then convert the csv_value or resolved_value into Number (any other possible type castings?)

  4. If a field has "resolve: function() { ... }", then use that user-defined function to generate the data to be stored in this field (avoid db queries!). Attach the field's scope to this function!

  5. If the options property has a "resolve: function() { ... }", then use that user-defined function to generate the query (avoid db queries!). Attach the intermediate query's scope to this function!

3. Once query is generated, push into generated queries list.

## STRUCTURE OF MAP

<pre>

{
    fields: {
        'header name 1': {
            field_name: "field-name-in-the-database-model",
            type: String, // or Number. default: String
            ref_model_name: "name-of-model-which-this-field-will-refer-to",
            ref_field_name: "name-of-field-in-the-reference-model",
            resolve: function() { // user-defined function to resolve this field
                // ...
                return (
                    // must return the data to be stored in this field
                );
            }
        },
        'header name 2': {
            field_name: "field-name-in-the-database-model",
            type: String, // or Number. default: String
            ref_model_name: "name-of-model-which-this-field-will-refer-to",
            ref_field_name: "name-of-field-in-the-reference-model",
            resolve: function() { // user-defined function to resolve this field
                // ...
                return (
                    // must return the data to be stored in this field
                );
            }
        }
    },
    options: {
        name: "unique-name-for-the-mapping-table",
        model_name: "model-name-where-query-operation-will-take-place",
        type: "insert", // or "update" ( or "upsert" or "delete")
        resolve: function() { // user-defined function to resolve this query
            // ...
            return {
                // must return the query
                // for insert: the document object
                // for update: the selector & modifier object
                // etc.
            };
        }
    }
};

</pre>