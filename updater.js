require("./index.js");
const cron = require("node-cron")
const { exec } = require("child_process");
const fs = require("fs")
const posts = require("./customs/posts/get.js")

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

cron.schedule('* * */1 * * *', async () => {
    await posts()
})

cron.schedule('* */10 * * * *', async () => {
    const fet = await fetch("https://eodhistoricaldata.com/api/real-time/EUR.FOREX?api_token=demo&fmt=json")

    fs.writeFileSync("./eur-usd.json", JSON.stringify(await fet.json()))
})