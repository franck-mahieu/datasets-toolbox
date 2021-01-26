const {applyOnEachLines} = require('../common/utils')

/**
 * Log each lines not parsable in object by line file
 */
const logWhenLineIsNotParsable = ({line}) => {
    try {
        if (line) {
            JSON.parse(line);
        }
    } catch (e) {
        console.error("This line is not parsable :", line)
    }
}

const sourcePath = process.env.sourcePath ? process.env.sourcePath : `${__dirname}/../../dataset/validation/detectErrorInJsonLineByLine`;

(async () => {
    console.log(`Log when line is not parsable in process for this file ${sourcePath}.json`)
    try {
        await applyOnEachLines({sourcePath, extension: ".json", functionToApply: logWhenLineIsNotParsable})
    } catch (err) {
        console.error('An error occured', err)
    }
})();

