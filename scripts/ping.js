/**
 * Launch a ping with your node network configuration
 * helpfull if you want to check the connectivity between your node env and an ip (to test network configuration)
 */

const ipToPing = process.env.ipToPing ? process.env.ipToPing : `www.google.com`;

const exec = require('child_process').exec;

exec(`ping -t 1 ${ipToPing}`, (err, stdout) => {
    if (err) {
        console.error(err)
    } else {
        console.log(stdout);
    }
});
