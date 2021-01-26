const {convertCsvToJson} = require('../common/utils')

/**
 * Script to convert csv data file to json file
 */

const sourcePath = process.env.sourcePath ? process.env.sourcePath : `${__dirname}/../../dataset/transform/convertCsvToJson`;

(async () => {
    console.log("Convert csv to json in process")
    try {
        await convertCsvToJson({sourcePath, csvOptions: {delimiter: ";", downstreamFormat: "array"}})
    } catch (err) {
        console.error('An error occured', err)
    }
})();
