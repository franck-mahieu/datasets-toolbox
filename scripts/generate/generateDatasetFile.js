const fs = require('fs');

/**
 * Script to generate a set of data with a configurable number of rows, using data retrieved randomly in the json file
 * passed as a parameter
 */

const expectedLines = process.env.expectedLines ? process.env.expectedLines : 100000;
const linesToInsert = process.env.inputFilePath ? require(process.env.inputFilePath) : require(`./generateDatasetFileSamples.json`);
const outputFilePath = process.env.outputFilePath ? process.env.outputFilePath : `${__dirname}/../../dataset/generate/generatedDatasetFile-${expectedLines}-lines.csv`;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

(async () => {
    console.info(`Generate dataset of ${expectedLines} lines is launched`)
    const startHrTime = process.hrtime();

    try {
        let readStream = fs.createWriteStream(outputFilePath);
        for (let i = 0; i< expectedLines; i+=1){
            readStream.write(`${linesToInsert[randomIntFromInterval(0,linesToInsert.length-1)]}\n`)
        }
        readStream.emit('end');
        const endHrTime = process.hrtime(startHrTime);
        console.info(`Dataset "${outputFilePath}" file was successfully generated in ${endHrTime[0]}s and ${endHrTime[1] / 1000000}ms`);
    } catch (err) {
        console.error('An error occured', err)
    }
})();
