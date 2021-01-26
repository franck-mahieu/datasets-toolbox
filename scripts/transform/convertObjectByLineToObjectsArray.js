const {convertFile} = require('../common/utils')
const {EOL} = require("os");

/**
 * Convert a file with one object by line to an array of json objects
 * exemple of input file:
 * {"line1":"value"}
 * {"line2":"value"}
 */
const convertObjectByLineToObjectsArray = ({line, isFirstLine, isLastLine}) => {
    if (isFirstLine) {
        return `[${EOL}${line}`;
    } else if (isLastLine) {
        return `${EOL}]`;
    } else if (line) {
        return `,${EOL}${line}`;
    }
}

const sourcePath = process.env.sourcePath ? process.env.sourcePath : `${__dirname}/../../dataset/transform/convertObjectByLineToObjectsArray`;

(async () => {
    console.log("Convert file containing one object by line to an objects array in process")
    try {
        await convertFile({sourcePath, extension: ".json", convertFunction: convertObjectByLineToObjectsArray})
    } catch (err) {
        console.error('An error occured', err)
    }
})();
