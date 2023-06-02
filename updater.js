require("./index.js");
const cron = require("node-cron")
const { exec } = require("child_process");
const fs = require("fs")
const ig = require("./getPosts.js")

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

cron.schedule('0 0 * * * *', async () => {
    await ig.posts()
    console.log("Got posts")
})

// cron.schedule('* */4 * * * *', async () => {
//     const fet = await fetch("https://eodhistoricaldata.com/api/real-time/EUR.USD?fmt=json&&api_token=6478bd499255a6.76524263")

//     fs.writeFileSync("./eur-usd.json", JSON.stringify(await fet.json()))
// })