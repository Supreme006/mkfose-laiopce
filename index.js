const express = require("express");
const app = express();
const partials = require("express-partials");
const bodyParser = require("body-parser");
const session = require("express-session");
const { port, siteName } = require("./config.json");
const { MongoClient } = require("mongodb");
const multer = require("multer");
const ms = require("ms");
const axios = require('axios');
const fs = require('fs');
console.clear();
const price = require("./storage/eur-usd.json");
const qdb = require('quick.db');
const stripe = require("stripe")('sk_test_51LOUl6JKjzcCysBWf60dwWUvdmlghsO9ALZzFv2suXQLduy2bw2wsoI8vb8Gzvv6WrxeRygJAPhjZEgjImj7tjUI00EmvaDvC5')
function eurtousd(pric) {
  const result = Number(pric / price.close)

  return result.toFixed(2);
}

let images = [];
const uri =
  "mongodb+srv://darkstar:miabeba1@cluster0.myl0e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongo = new MongoClient(uri, { useUnifiedTopology: true });

async function connect() {
  await mongo.connect();
}

function removeFromArray(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

connect();
const db = mongo.db("Adores");

function imageName(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name = `${imageName(15)}-${uniqueSuffix}.png`;
    cb(null, name); // use the original file name as the new file name
    images.push(`\"${name}\"`);
  },
});

const upload = multer({ storage: storage });

app.listen(port, () => {
  console.info(`Starting web on port ${port}!`);
});

app.set("port", port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(partials());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: "48738924783748273742398747238",
    resave: false,
    saveUninitialized: false,
    expires: 604800000,
  })
);

app.get("/adores", async (req, res) => {
  res.render("languages/hr/policy/tvrtka", { req: req, siteName: siteName })
})

app.get("/info/media", async (req, res) => {
  res.render("languages/hr/policy/media", { req: req, siteName: siteName })
})

app.get("/help/delivery", async (req, res) => {
  res.render("languages/hr/policy/shipping", { req: req, siteName: siteName })
})

app.get("/help/sizes", async (req, res) => {
  res.render("languages/hr/policy/sizes", { req: req, siteName: siteName })
})

app.get("/aboutus", async (req, res) => {
  res.render("languages/hr/policy/aboutUs", { req: req, siteName: siteName })
})

app.get("/policy/returns", async (req, res) => {
  res.render("languages/hr/policy/nacinpovrata", { req: req, siteName: siteName })
})

app.get("/policy/payments", async (req, res) => {
  res.render("languages/hr/policy/nacinplacanja", { req: req, siteName: siteName })
})

app.get("/policy/data", async (req, res) => {
  res.render("languages/hr/policy/zastitapodataka", { req: req, siteName: siteName })
})

app.get("/checkout", async (req, res) => {



  let arr = req.session.cart
  let promo = req.session.code;

  function percentageOff(price, percentage) {
    return price * (1 - percentage / 100).toFixed(2)
  }

  if (!req.session.value) {
    req.session.value = "eur";
  }
  if (!req.session.language) {
    req.session.language = "hr";
  }

  if (req.session.language == "hr")
    return res.render("languages/hr/checkout", {
      siteName: siteName,
      req: req,
      promo: promo,
      cart: arr, eurtousd: eurtousd, percentageOff: percentageOff
    });
  if (req.session.language == "de")
    return res.render("languages/hr/checkout", {
      siteName: siteName,
      req: req,
      promo: promo, cart: arr, eurtousd: eurtousd, percentageOff: percentageOff
    });
  if (req.session.language == "en")
    return res.render("languages/hr/checkout", {
      siteName: siteName,
      req: req,
      promo: promo, cart: arr, eurtousd: eurtousd, percentageOff: percentageOff
    });
});

app.get("/products/:name", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  const name = req.params.name;
  const title = name.replace(/_/g, " ");
  const result = await db.collection("products").find({ "title": title }).toArray();
  let other = await db.collection("products").find({ "collection": result[0].collection }).toArray()


  other = removeFromArray(other, result)

  if (req.session.language == "hr")
    return res.render("languages/hr/product", { siteName: siteName, req: req, product: result[0], eurtousd: eurtousd, other: other });
  if (req.session.language == "de")
    return res.render("languages/hr/product", { siteName: siteName, req: req, product: result[0], eurtousd: eurtousd, other: other });
  if (req.session.language == "en")
    return res.render("languages/hr/product", { siteName: siteName, req: req, product: result[0], eurtousd: eurtousd, other: other });
});

app.get("/", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }
  if (!req.session.language) {
    req.session.language = "hr";
  }

  qdb.add('views', 1)

  const data = fs.readFileSync("./customs/tempFiles/disposedPhotos.json");
  const info = JSON.parse(data)

  // const info = await ig.posts()

  async function downloadImage(url, filename) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      fs.writeFileSync("public/tempImage/" + filename, response.data, (err) => {
        if (err) throw err;
        if (err) console.log("err: " + err)
      });
    } catch (err) {
      console.log("error")
    }
  }

  info.forEach(pohoto => {
    downloadImage(pohoto.imageUrl, pohoto.id + ".png");
  })

  const collection = await db.collection("products").find({ "collection": "adores_it" }).toArray()
  collection.reverse()
  const coll = []

  for (let i = 0; i < collection.length; i++) {
    if (i > 5) break;
    coll.push(collection[i])
  }

  if (req.session.language == "hr")
    return res.render("languages/hr/home", { siteName: siteName, req: req, posts: info, collection: coll, eurtousd: eurtousd });
  if (req.session.language == "de")
    return res.render("languages/de/home", { siteName: siteName, req: req, posts: info, collection: coll, eurtousd: eurtousd });
  if (req.session.language == "en")
    return res.render("languages/en/home", { siteName: siteName, req: req, posts: info, collection: coll, eurtousd: eurtousd });
});

app.get("/register", async (req, res) => {
  if (req.session.language == "hr")
    return res.render("languages/hr/register", {
      siteName: siteName,
      req: req,
    });
  if (req.session.language == "de")
    return res.render("languages/de/register", {
      siteName: siteName,
      req: req,
    });
  if (req.session.language == "en")
    return res.render("languages/en/register", {
      siteName: siteName,
      req: req,
    });
});

app.get("/login", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  if (req.session.language == "hr")
    return res.render("languages/hr/login", { siteName: siteName, req: req });
  if (req.session.language == "de")
    return res.render("languages/de/login", { siteName: siteName, req: req });
  if (req.session.language == "en")
    return res.render("languages/en/login", { siteName: siteName, req: req });
});

app.get("/new", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  if (req.session.language == "hr")
    return res.render("languages/hr/novo", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "de")
    return res.render("languages/de/novo", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "en")
    return res.render("languages/en/novo", { siteName: siteName, req: req, eurtousd: eurtousd });
});

app.get("/dresses", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  if (req.session.language == "hr")
    return res.render("languages/hr/haljine", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "de")
    return res.render("languages/de/haljine", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "en")
    return res.render("languages/en/haljine", { siteName: siteName, req: req, eurtousd: eurtousd });
});

app.get("/clothing", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  if (req.session.language == "hr")
    return res.render("languages/hr/majice", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "de")
    return res.render("languages/de/majice", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "en")
    return res.render("languages/en/majice", { siteName: siteName, req: req, eurtousd: eurtousd });
});

app.get("/cart", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  let cart = req.session.cart;
  if (!cart) cart = "empty";
  if (req.session.language == "hr")
    return res.render("languages/hr/cart", {
      siteName: siteName,
      req: req,
      products: cart, eurtousd: eurtousd
    });
  if (req.session.language == "de")
    return res.render("languages/de/cart", {
      siteName: siteName,
      req: req,
      products: cart, eurtousd: eurtousd
    });
  if (req.session.language == "en")
    return res.render("languages/en/cart", {
      siteName: siteName,
      req: req,
      products: cart, eurtousd: eurtousd
    });
});

app.get("/search", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  const products = await db.collection("products").find().toArray();

  if (req.session.language == "hr")
    return res.render("languages/hr/search", {
      siteName: siteName,
      req:
        req,
      products: products,
    });
  if (req.session.language == "de")
    return res.render("languages/de/search", {
      siteName: siteName,
      req:
        req,
      products: products, eurtousd: eurtousd
    });
  if (req.session.language == "en")
    return res.render("languages/en/search", {
      siteName: siteName,
      req:
        req,
      products: products, eurtousd: eurtousd
    });
});

app.get("/tops", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  if (req.session.language == "hr")
    return res.render("languages/hr/topici", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "de")
    return res.render("languages/de/topici", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "en")
    return res.render("languages/en/topici", { siteName: siteName, req: req, eurtousd: eurtousd });
});

app.get("/collections", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  if (req.session.language == "hr")
    return res.render("languages/hr/kolekcije", {
      siteName: siteName,
      req: req, eurtousd: eurtousd
    });
  if (req.session.language == "de")
    return res.render("languages/de/kolekcije", {
      siteName: siteName,
      req: req, eurtousd: eurtousd
    });
  if (req.session.language == "en")
    return res.render("languages/en/kolekcije", {
      siteName: siteName,
      req: req, eurtousd: eurtousd
    });
});

app.get("/account/orders", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  if (!req.session.user) return res.redirect("/login");
  if (req.session.language == "hr")
    return res.render("languages/hr/orders", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "de")
    return res.render("languages/de/orders", { siteName: siteName, req: req, eurtousd: eurtousd });
  if (req.session.language == "en")
    return res.render("languages/en/orders", { siteName: siteName, req: req, eurtousd: eurtousd });
});

app.get("/account/adresses", async (req, res) => {
  if (!req.session.value) {
    req.session.value = "eur";
  }

  if (!req.session.language) {
    req.session.language = "hr";
  }
  if (!req.session.user) return res.redirect("/login");
  if (req.session.language == "hr")
    return res.render("languages/hr/adresses", {
      siteName: siteName,
      req: req,
    });
  if (req.session.language == "de")
    return res.render("languages/de/adresses", {
      siteName: siteName,
      req: req,
    });
  if (req.session.language == "en")
    return res.render("languages/en/adresses", {
      siteName: siteName,
      req: req,
    });
});

app.get("/admin/dashboard", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  const stats = await db.collection("statistic").find().toArray();

  stats.reverse();

  res.render("languages/hr/dashboard", {
    siteName: siteName,
    req: req,
    stats: stats,
  });
});

app.get("/activity/last30", async (req, res) => {
  const stats = await db.collection("statistic").find().toArray();

  stats.reverse();

  let last30d = [];
  let last30v = [];
  let last30s = [];

  for (let i = 0; i < stats.length; i++) {
    if (i == 30) break;

    const splited = stats[i].date.split(".");

    last30d.push(`${splited[0]}.${splited[1]}`);
  }
  for (let i = 0; i < stats.length; i++) {
    if (i == 30) break;
    last30v.push(stats[i].views.toString());
  }
  for (let i = 0; i < stats.length; i++) {
    if (i == 30) break;
    last30s.push(stats[i].sold.toString());
  }

  last30d.reverse();
  last30s.reverse();
  last30v.reverse();

  let mi = "";

  mi = JSON.parse(
    `{"date": ${JSON.stringify(last30d)}, "views": ${JSON.stringify(
      last30v
    )}, "sold": ${JSON.stringify(last30s)}}`
  );

  res.send(mi);
});

app.get("/admin/orders", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  const orders = await db.collection("orders").find({}).toArray();

  res.render("admin/porudzbine", { siteName: siteName, req: req, orders: orders });
});

app.get("/admin/orders", async (req, res) => {
  // if (!req.session.user) return res.redirect("/404");
  // if (!req.session.user.isAdmin) return res.redirect("/404");

  res.render("admin/porudzbine", {
    siteName: siteName,
    req: req,
    products: products,
  });
});

app.get("/admin/activity", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  const products = await db.collection("statistic").find().toArray();

  products.reverse();

  res.render("admin/desavanja", {
    siteName: siteName,
    req: req,
    products: products,
  });
});

app.get("/admin/new", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  res.render("admin/novo", { siteName: siteName, req: req });
});

app.get("/admin/dresses", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  const products = await db
    .collection("products")
    .find({ category: "haljine" })
    .toArray();

  res.render("admin/haljine", {
    siteName: siteName,
    req: req,
    products: products,
  });
});

app.get("/admin/clothing", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  const products = await db
    .collection("products")
    .find({ category: "majice" })
    .toArray();

  res.render("admin/majice", {
    siteName: siteName,
    req: req,
    products: products,
  });
});

app.get("/admin/tops", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  const products = await db
    .collection("products")
    .find({ category: "topici" })
    .toArray();

  res.render("admin/topici", {
    siteName: siteName,
    req: req,
    products: products,
  });
});

app.get("/admin/collections", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  const products = await db
    .collection("products")
    .find({ category: "kolekcije" })
    .toArray();

  res.render("admin/kolekcije", {
    siteName: siteName,
    req: req,
    products: products,
  });
});

app.get("/admin/edit/:id", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  const id = req.params.id;

  const product = await db.collection("products").find({ title: id })

  res.render("admin/edit", { siteName: siteName, req: req, product: product });
});

app.get("/test", async (req, res) => {
  const fet = await fetch("https://eodhistoricaldata.com/api/real-time/EUR.FOREX?api_token=demo&fmt=json")

  fs.writeFileSync("./eur-usd.json", JSON.stringify(await fet.json()))

  res.render("test", { siteName: siteName, req: req, eurtousd: eurtousd });
});

app.get("/admin/add", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  res.render("admin/add", { siteName: siteName, req: req });
});

app.get("/admin/uploaded", async (req, res) => {
  if (!req.session.user) return res.redirect("/404");
  if (!req.session.user.isAdmin) return res.redirect("/404");

  res.render("admin/uploaded");
});

app.post("/removeFromCart", async (req, res) => {
  const id = req.body.title;
  let cart = req.session.cart;
  const result = await db.collection("products").find({ title: id }).toArray();
  let newArr = []

  for (let i = 0; i < cart.length; i++) {

    if (cart[i].title != result[0].title) {
      newArr.push(cart[i])
    }

    if (cart[i].title == result[0].title) { }
  }

  if (JSON.stringify(newArr) == "[]") newArr = false;

  req.session.cart = newArr;
  return res.json({ response: "removed" });
});

app.post("/checkout", async function (req, res) {
  const expirem = req.body.expirem
  const expirey = req.body.expirey
  const holder = req.body.holder
  const number = req.body.number
  const cvv = req.body.cvv
  const zip = req.body.zip
  const country = req.body.country
  const fName = req.body.fName
  const lName = req.body.lName
  const address = req.body.address
  const email = req.body.email
  const username = req.body.username
  const orderID = req.body.orderID
  const cart = req.session.cart;
  let amount = req.body.total;
  let err = false;
  amount = amount.replace(".", "")
  try {

    let paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: number,
        exp_month: expirem,
        exp_year: "20" + expirey,
        cvc: cvv
      },
      billing_details: { email: email, name: holder }
    })

    await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount,
      currency: req.session.value || "eur",
      confirm: true,
      payment_method_types: ['card'],
    })

  } catch (e) {
    if (e) {
      err = true;
    }
    switch (e.type) {
      case 'StripeCardError':
        res.send({ "error": `${e.message}` })
        break;
    }
  }
  if (err) return;

  const orders = db.collection("orders")
  for (let i = 0; i < cart.length; i++) {
    const old = await db.collection("sold").findOne({ title: cart[i].title });
    qdb.add(`totalSold`, 1)

    if (old) {
      const newVal = {
        "title": `${cart[i].title}`,
        "sold": old.sold + 1
      }

      await db.collection("sold").updateOne(old, { $set: newVal })

    } else {
      await db.collection("sold").insertOne(
        {
          "title": `${cart[i].title}`,
          "sold": 1,
        }
      )
    }

    const date = new Date();
    const day = date.getDate()
    const month = date.getMonth()
    const minute = date.getMinutes()
    const hour = date.getHours();
    const year = date.getFullYear();

    amount = (amount / 100).toFixed(2);

    orders.insertOne({
      "title": `${cart[i].title}`,
      "address": `${address}`,
      "zip": `${zip}`,
      "country": `${country}`,
      "firstName": `${fName}`,
      "lastName": `${lName}`,
      "email": `${email}`,
      "color": `${cart[i].color}`,
      "size": `${cart[i].size}`,
      "orderID": `${orderID}`,
      "username": `${username}`,
      "date": `${day}.${month}.${year}`,
      "time": `${hour}:${minute}`,
      "orderStatus": `pakovanje`,
      "price": `${Number(amount)}`
    })
  }

  req.session.cart = undefined;

  return res.send({ "response": "success" })

})

app.post("/checkOrderId", async function (req, res) {
  const result = await db.collection("orders").findOne({ orderID: req.body.order_id });
  if (result) return res.send({ "message": "exist" });
  if (!result) return res.send({ "message": "approved" })
})

app.post("/checkCode", async function (req, res) {
  const codes = require("./customs/percentage/scripts/check")
  const prome = await codes.checkPromo(req.body.promo)
  if (prome) {
    req.session.code = prome;
    return res.redirect("/checkout");
  } else {
    return res.send({ "code": "invalid" });
  }
})

app.post("/addToCart", async function (req, res) {
  const id = req.body.title;
  const size = req.body.sizes;
  const color = req.body.colors;
  let adding;
  const result = await db.collection("products").findOne({ title: id });

  if (!result) return;

  let err;
  let cart = [];

  if (req.session.cart) cart = req.session.cart;

  cart.forEach(item => {
    if (item.title == result.title) return err = true;
  })

  if (err) return res.json({ response: "failed" });
  adding = {
    "title": result.title,
    "description": result.description,
    "images": result.images,
    "price": result.price,
    "size": size,
    "color": color
  }
  cart.push(adding);
  req.session.cart = await cart;

  return res.json({ response: "added" });
});

app.post("/register", async (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  let offers = req.body.offers;

  if (offers == "on") offers = true;
  if (offers == "off") offers = false;

  const user = await db.collection("users").findOne({ email: email });
  if (user) return res.send("Already registred email");


  if (firstName && lastName && email && password && offers) {
    const data = JSON.parse(`{
            "firstName": "${firstName}",
            "lastName": "${lastName}",
            "email": "${email}",
            "password": "${password}",
            "offers": ${offers},
            "isAdmin": false
        }`);
    req.session.user = data;
    db.collection("users").insertOne(
      data
    );

    return res.redirect("/");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const usersCollection = db.collection("users");
  const user = await usersCollection.findOne({ email });

  if (!user) return res.send("Wrong username");

  if (password == user.password) {
    req.session.user = user;
    res.redirect("/");
  } else {
    return res.send("Wrong password.");
  }
});

app.post("/changeValue", async (req, res) => {
  const value = req.body.value;

  req.session.value = value;

  res.redirect("/");
});

app.post("/changeLanguage", async (req, res) => {
  const language = req.body.language;

  req.session.language = language;

  res.redirect("/");
});

app.post("/edit", upload.array("filesfld", 10), async (req, res) => {

  let mi = "";
  let si = [];
  mi = images.toLocaleString();

  const category = req.body.category;
  const title = req.body.title;
  const description = req.body.description;
  const shortDescription = req.body.s_description;
  const pink = req.body.pink;
  const black = req.body.black;
  const white = req.body.white;
  const gold = req.body.gold;
  const price = req.body.price;
  const collection = req.body.collection;
  const sizes = req.body.sizes

  db.collection("products").insertOne(
    JSON.parse(`{
            "title": "${title}",
            "description": "${description}",
            "shortDescription": "${shortDescription}",
            "category": "${category}",
            "images": [${mi}],
            "price": ${Number(price)},
            "collection": "${collection}",
            "colors": {
                "pink": ${pink},
                "black": ${black},
                "white": ${white},
                "gold": ${gold}
            },
            "sizes": ${sizes}
        }`), function (res) {
    console.log(res)
  }
  );

});

app.post("/upload", upload.array("filesfld", 10), async (req, res) => {
  let mi = "";
  let si = [];
  mi = images.toLocaleString();

  const category = req.body.category;
  const title = req.body.title;
  const description = req.body.description;
  const shortDescription = req.body.s_description;
  const pink = req.body.pink;
  const black = req.body.black;
  const white = req.body.white;
  const gold = req.body.gold;
  const price = req.body.price;
  const collection = req.body.collection;
  const sizes = req.body.sizes

  db.collection("products").insertOne(
    JSON.parse(`{
            "title": "${title}",
            "description": "${description}",
            "shortDescription": "${shortDescription}",
            "category": "${category}",
            "images": [${mi}],
            "price": ${Number(price)},
            "collection": "${collection}",
            "colors": {
                "pink": ${pink},
                "black": ${black},
                "white": ${white},
                "gold": ${gold}
            },
            "sizes": ${sizes}
        }`), function (res) {
  }
  );


  images = [];

  return res.send(JSON.stringify([mi]));
});

app.get("*", async (req, res) => {
  res.render("languages/hr/404");
});
