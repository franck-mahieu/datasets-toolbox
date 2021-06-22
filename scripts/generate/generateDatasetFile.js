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

const write = (writer, data) => {
    return new Promise((resolve) => {
        if (!writer.write(data)) {
            writer.once('drain', resolve)
        } else {
            resolve()
        }
    })
}

(async () => {
    console.info(`Generate dataset of ${expectedLines} lines is launched`)
    const startHrTime = process.hrtime();
    try {
        let current = 0
        let writeStream = fs.createWriteStream(outputFilePath);
        writeStream.on('error', (err) => {
            throw err;
        })

        while (current <= expectedLines) {
            await write(writeStream, `${linesToInsert[randomIntFromInterval(0, linesToInsert.length - 1)]}\n`)
            current += 1;
        }

        writeStream.emit('end');
        const endHrTime = process.hrtime(startHrTime);
        console.info(`Dataset "${outputFilePath}" file was successfully generated in ${endHrTime[0]}s and ${endHrTime[1] / 1000000}ms`);
    } catch (err) {
        console.error('An error occured', err)
    }
})();

