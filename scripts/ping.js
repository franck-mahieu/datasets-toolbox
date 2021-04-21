const exec = require('child_process').exec;

/**
 * Launch a ping with your node network configuration
 * helpfull if you want to check the connectivity between your node env and an ip (to test network configuration)
 */
const ipToPing = process.env.ipToPing ? process.env.ipToPing : `8.8.8.8`;
const ipRegex = new RegExp("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");
const ipRegexResult = ipRegex.exec(ipToPing);

if (ipRegexResult) {
    exec(`ping -t 1 ${ipRegexResult[0]}`, (err, stdout) => {
        console.log(stdout);
        if (err) {
            console.error(err);
        }
    })
} else {
    console.error(`the ip ${ipToPing} is not a valid`)
}
