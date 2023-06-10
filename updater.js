const cron = require("node-cron")
const { exec } = require("child_process");
const fs = require("fs")
const posts = require("./customs/posts/get.js")
const qdb = require("quick.db")
require("./index.js");
exec('git pull', (error, stdout, stderr) => {
        if (error) {
           console.log(error)
        }
        console.log(`${stdout}`);
    });
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

cron.schedule('* */13 * * * *', async () => {
    await posts()
    console.log("got");
})

cron.schedule('* 0 0 * * *', async () => {
    const views = qdb.get('views')
    const sold = qdb.get(`sold`)
    const uri =
  "mongodb+srv://darkstar:miabeba1@cluster0.myl0e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongo = new MongoClient(uri, { useUnifiedTopology: true });

async function connect() {
  await mongo.connect();
}

connect();
const db = mongo.db("Adores");

const date = new Date();
const day = date.getDate() - 1;
const month = date.getMonth() + 1;
const year = date.getFullYear();

db.collection("statistic").insertOne(
    JSON.parse(`{
        "date": "${month}.${day}.${year}",
        "views": "${views}",
        "sold": "${sold}"
    }`)
)
qdb.delete(`views`)
qdb.delete(`sold`)
})

cron.schedule('* */10 * * * *', async () => {
    const fet = await fetch("https://eodhistoricaldata.com/api/real-time/EUR.FOREX?api_token=demo&fmt=json")

    fs.writeFileSync("./storage/eur-usd.json", JSON.stringify(await fet.json()))
})*99