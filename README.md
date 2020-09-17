
> **Note 1:** I created this project way back in 2016 for the purpose of ETLing a bunch of million-row CSV files with different headers into several interdependent MongoDB collections with different Document structures.

> **Note 2:** This project was meant to be as generic as possible, so the process is lead by feeding the porgram both the CSV files as well as a generic mapping configuration, which would tell the system what to do with each column.

> **Note 3:** This project was also meant to be fast, using as much "parallel" (read: let the event loop do everything) processing as possible.

---

# szn-csvtomongodb

Converting complex CSV files to JSON using csv-to-json npm package and then converting the JSON records into specified MongoDB schema forms before insertion or updation.
