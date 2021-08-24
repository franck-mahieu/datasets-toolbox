const fs = require('fs');
const path = require('path');

const folderPath = process.env.sourcePath ? process.env.sourcePath : `${__dirname}/../../dataset/validation/folderOfJsons`;

const jsonsToValidate = fs.readdirSync(path.resolve(folderPath));

(async () => {
    console.log(`detectErrorInJsonsInsideFolder in process for this folder ${folderPath}`)
    for (const jsonFile of jsonsToValidate) {
        if(jsonFile.endsWith('.json')){
            let rawJson = fs.readFileSync(`${folderPath}/${jsonFile}`);
            try {
                if (rawJson) {
                    JSON.parse(rawJson.toString());
                }
            } catch (e) {
                console.error("ERROR : This file is not a valid json  :", jsonFile, e)
            }
        }

    }
    console.log(`detectErrorInJsonsInsideFolder is ended`)
})();

