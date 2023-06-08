const list = require("../list.json");

async function checkPromo(promo) {
    let code = undefined;
    list.forEach(promoCode => {
        if (promoCode.code == promo) {
            code = promoCode;
        }
    })
    return code;
}

module.exports = {
    checkPromo
}