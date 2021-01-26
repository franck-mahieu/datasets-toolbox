const fs = require('fs');
const es = require('event-stream');
const {promisify} = require('util')
const {pipeline} = require('stream')
const csv = require('csvtojson');

const pipelineAsync = promisify(pipeline);

const applyOnEachLines = async ({sourcePath, extension, functionToApply}) => {
    let readStream = fs.createReadStream(`${sourcePath}${extension}`);

    console.log("Apply on each lines is starting")
    const hrStart = process.hrtime();

    readStream.on('end', () => {
        const hrEnd = process.hrtime(hrStart)
        console.log(`Apply on each lines ${sourcePath}${extension} was completedd in ${hrEnd[0]}s ${hrEnd[1] / 1000000}ms`)
    });

    let isFirstLine = true
    return await pipelineAsync(readStream, es.split(), es.mapSync(line => {
            functionToApply({line, isFirstLine})
        }
    ));
}

const convertFile = async ({sourcePath, extension, convertFunction}) => {
    const targetPath = `${sourcePath}-converted`;

    let readStream = fs.createReadStream(`${sourcePath}${extension}`);
    let writeStream = fs.createWriteStream(`${targetPath}${extension}`, {encoding: "utf8"});

    console.log("Convert file is starting")
    const hrStart = process.hrtime();

    readStream.on('end', () => {
        writeStream.write(convertFunction({isLastLine: true}));
        const hrEnd = process.hrtime(hrStart)
        console.log(`File ${targetPath}${extension} was successfully converted in ${hrEnd[0]}s ${hrEnd[1] / 1000000}ms`)
    });

    let isFirstLine = true
    return await pipelineAsync(readStream, es.split(), es.mapSync(line => {
            const result = convertFunction({line, isFirstLine})
            if (isFirstLine) {
                isFirstLine = false
            }
            return result
        }
    ), writeStream);
}

const convertCsvToJson = async ({sourcePath, csvOptions}) => {
    const targetPath = `${sourcePath}-converted`;

    let readStream = fs.createReadStream(`${sourcePath}.csv`);
    let writeStream = fs.createWriteStream(`${targetPath}.json`, {encoding: "utf8"});

    console.log("Convert csv file is starting")
    const hrStart = process.hrtime();

    readStream.on('end', () => {
        const hrEnd = process.hrtime(hrStart)
        console.log(`File ${targetPath}.json was successfully converted in ${hrEnd[0]}s ${hrEnd[1] / 1000000}ms`)
    });

    return await pipelineAsync(readStream, csv(csvOptions), writeStream);
}

module.exports.convertFile = convertFile;
module.exports.convertCsvToJson = convertCsvToJson;
module.exports.applyOnEachLines = applyOnEachLines;
