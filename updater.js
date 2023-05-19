require("./index.js");
const cron = require("node-cron")
const { exec } = require("child_process");

cron.schedule('*/10 * * * * *', () => {
    exec('git pull', (error, stdout, stderr) => {
        if (error) {
            console.log(`${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`${stderr}`);
            return;
        }
        console.log(`${stdout}`);
    });
});