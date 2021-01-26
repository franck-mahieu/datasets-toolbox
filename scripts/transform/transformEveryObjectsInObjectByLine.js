const {convertFile} = require('../common/utils')
const {EOL} = require("os");

/**
 * Update this function to customize your transformation
 */
function transformObject(lineObject) {
    //Simple example to add date for each object
    lineObject.date = new Date();
    return lineObject
}

/**
 * Transform every object and create a new file with
 */
const transformEveryObjectsInObjectByLine = ({line, isFirstLine}) => {
    if (!line || line === "") {
        return "";
    }

    let lineObject = JSON.parse(line);
    if (isFirstLine) {
        return JSON.stringify(transformObject(lineObject));
    } else {
        return `${EOL}${JSON.stringify(transformObject(lineObject))}`;
    }
}

const sourcePath = process.env.sourcePath ? process.env.sourcePath : `${__dirname}/../../dataset/transform/transformEveryObjectInObjectByLine`;

(async () => {
    console.log("Transform file containing one object by line in process")
    try {
        await convertFile({sourcePath, extension: ".json", convertFunction: transformEveryObjectsInObjectByLine})
    } catch (err) {
        console.error('An error occured', err)
    }
})();
