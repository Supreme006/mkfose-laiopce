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
            if (!stderr.includes("Already up to date.")) {
                console.log(`${stderr}`);
            } else return;
        }
        console.log(`${stdout}`);
    });
});