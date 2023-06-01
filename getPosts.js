const { iwaTag, iwa, iwaId, iwaIdUrl } = require('instagram-without-api-node');
const fs = require("fs")

const _cookie = 'mid=ZHHtNwALAAFhjIXkUfuez44cOUL8; ig_did=0CAFBA4C-1695-43A3-B18B-801EF60EBC7E; ig_nrcb=1; datr=Nu1xZNu6v4s2o0XQR1VCfrkh; fbm_124024574287414=base_domain=.instagram.com; shbid="3462\05444432295043\0541717184593:01f7dbc551e5a162c4c88f18eddae3489acf902de40a48c4663b400bbfd437d045d663af"; shbts="1685648593\05444432295043\0541717184593:01f7eba90d564b049047c3db96be460a6ae22f9d26e6460b6367f88fc2f18658c629f221"; fbsr_124024574287414=UwpHqUWNLgRHqpTAa5oKovhIKz3xigxZDuG9Ru7Sf7k.eyJ1c2VyX2lkIjoiMTAwMDIxMjgyNDY4NjkyIiwiY29kZSI6IkFRQzU5T1c0ZUlmQVU0WkNjaTd3NENoeXROcjNoTXVXRWZzZlRoclFjaXdnQlo0ZGgzeTMxZ1MtaklIUmljSGV6TkRhc2lvbXM3al90dDdvWmM2X3JoUXpycmltLTNiWTdaMThGZXg4MlhFbFNoLWVHSWN4RWxYUnhCeXNmZ09kTlBiYnhjeXVTNjdqV19jNHVNYUlMQ29jelIzZFFHZTZmbTd2UmphcXhIWXlhdFpxbW14QlVKeFVnakRMc3o5M2drR2xxakFIMzBNLUFfOFhhUUV4NzZyZVQ4N2pySjVtUmw2U1lJVVhtbl9sNEdtOVB2UWZzMGoxYVNnaTVKQ3NNaFVJN2FmYzJyNElqNVprNW1wVTB3UldGTFZxMHBmSFRlZnU2cWE0RGE5RUZIZGhPZG8yZTgzOElybzhTWmZFZHFFZElwUXdaWVZJcWtpNHc0TVYyOHpKIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUxkU2hEM1pBN1RwV0taQnZHRk56UlpDRXFTUlJXNVpCdlpBRFhndDVFc0lsUEtaQ1ZwRVhkWTd5WDF5Skh0UDVjS1pBMEYxbGtCTkhkMWY0NjZTeGJxTm81dDFtV3NBRDduM3RkaFFIclBEeHhLQjlQMndMcGZDYlY4QXExVURENXJnMmFaQ1pBNHNpd0lqa0lXOEs4SzVmUE9wU1pBQUlrY2pTSk1WWkNnRENrYWRhc0NHSEI3NTdRWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY4NTY1MTIzNX0; fbsr_124024574287414=UwpHqUWNLgRHqpTAa5oKovhIKz3xigxZDuG9Ru7Sf7k.eyJ1c2VyX2lkIjoiMTAwMDIxMjgyNDY4NjkyIiwiY29kZSI6IkFRQzU5T1c0ZUlmQVU0WkNjaTd3NENoeXROcjNoTXVXRWZzZlRoclFjaXdnQlo0ZGgzeTMxZ1MtaklIUmljSGV6TkRhc2lvbXM3al90dDdvWmM2X3JoUXpycmltLTNiWTdaMThGZXg4MlhFbFNoLWVHSWN4RWxYUnhCeXNmZ09kTlBiYnhjeXVTNjdqV19jNHVNYUlMQ29jelIzZFFHZTZmbTd2UmphcXhIWXlhdFpxbW14QlVKeFVnakRMc3o5M2drR2xxakFIMzBNLUFfOFhhUUV4NzZyZVQ4N2pySjVtUmw2U1lJVVhtbl9sNEdtOVB2UWZzMGoxYVNnaTVKQ3NNaFVJN2FmYzJyNElqNVprNW1wVTB3UldGTFZxMHBmSFRlZnU2cWE0RGE5RUZIZGhPZG8yZTgzOElybzhTWmZFZHFFZElwUXdaWVZJcWtpNHc0TVYyOHpKIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUxkU2hEM1pBN1RwV0taQnZHRk56UlpDRXFTUlJXNVpCdlpBRFhndDVFc0lsUEtaQ1ZwRVhkWTd5WDF5Skh0UDVjS1pBMEYxbGtCTkhkMWY0NjZTeGJxTm81dDFtV3NBRDduM3RkaFFIclBEeHhLQjlQMndMcGZDYlY4QXExVURENXJnMmFaQ1pBNHNpd0lqa0lXOEs4SzVmUE9wU1pBQUlrY2pTSk1WWkNnRENrYWRhc0NHSEI3NTdRWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY4NTY1MTIzNX0; csrftoken=aM0tKYzezvcwxCh38fJVHEglPk5jEdtd; ds_user_id=59259823516; sessionid=59259823516%3AoDBI7tPBfh05Wo%3A28%3AAYcLF1oeQOkMtg4tm4ZM407NxKllenI06ynI9JDuyQ; rur="CLN\05459259823516\0541717187288:01f7ef882359f4d081bcd267a5daf00e08293a50db1cd02a79f4a0a82277d9450eef1dbf"';
const _userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
const _xIgAppId = '936619743392459'
async function posts() {
    const responseIwa = await iwa({

        base64images: true,                     // <!-- optional, but without you will be not able to save images.. it increases the size of the json file
        base64imagesCarousel: false,            // <!-- optional but not recommended, it increases the size of the json file
        base64videos: false,                    // <!-- optional but not recommended, it increases the size of the json file

        headers: {
            'cookie': _cookie,
            'user-agent': _userAgent,
            'x-ig-app-id': _xIgAppId
        },

        maxImages: 6,                           // <!-- optional, 12 is the max number
        file: "instagram-cache.json",           // <!-- optional, instagram-cache.json is by default
        pretty: true,                           // <!-- optional, prettyfy json true/false
        time: 3600,                             // <!-- optional, reload contents after 3600 seconds by default

        id: "adores.fsh"                     // <!-- id is required

    })

    console.log({ responseIwa })

    const results = [];

    await responseIwa.forEach(res => {
        const final = {
            "time": res.time,
            "imageUrl": res.imageUrl,
            "likes": res.likes,
            "comments": res.comments,
            "link": res.link,
            "text": res.text,
            "id": res.id
        }
        results.push(final)
    })

    fs.unlinkSync("./instagram-cache.json")

    return results;
}

async function image(id) {
    const responseIwa = await iwaIdUrl({

        headers: {
            'cookie': _cookie,
            'user-agent': _userAgent,
            'x-ig-app-id': _xIgAppId
        },

        base64images: true,                    // <!-- optional, but without it, you will be not able to store/show images
        file: "instagram-cache-byidurl.json",   // <!-- optional, instagram-cache.json is by default
        pretty: true,                           // <!-- optional, prettyfy json true/false
        time: 3600,                                  // <!-- optional, reload contents after 3600 seconds by default

        id: "CsrUAWANBGM"                     // <!-- id is required

    })

    console.log(responseIwa)
}

// image()

posts()

// module.exports = {
//     posts
// }