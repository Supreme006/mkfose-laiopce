const { iwaTag, iwa, iwaId, iwaIdUrl } = require('instagram-without-api-node');
const fs = require("fs")

const _cookie = 'mid=ZHHtNwALAAFhjIXkUfuez44cOUL8; ig_did=0CAFBA4C-1695-43A3-B18B-801EF60EBC7E; ig_nrcb=1; datr=Nu1xZNu6v4s2o0XQR1VCfrkh; fbm_124024574287414=base_domain=.instagram.com; shbid="3462\05444432295043\0541716916741:01f7f94da809bf730f7df848b0e259576997fc5726b365249ede6d73f998b0e519a83f9e"; shbts="1685380741\05444432295043\0541716916741:01f74bb1cd469a22da5a05406bb22a9059a75955b7a8887857ea04ad51ebea415d6bd596"; csrftoken=OyBz83HG3kxLNDtVPwd7Su0tFRpeFijn; ds_user_id=44432295043; sessionid=44432295043%3AcLgGVmeZ0qBfsE%3A4%3AAYeG7nnrI5UcZcYsOVb7auqla34n0k0JR0qylYj43g; fbsr_124024574287414=ZxiAuwTBqkjywYPcwowfll5KwGGsWsPh5UOginuxz9g.eyJ1c2VyX2lkIjoiMTAwMDIxMjgyNDY4NjkyIiwiY29kZSI6IkFRQjlSUlNrYjRZN2dyQTRzbUQtSGsybTYyWHZhUXlrcGEySjlvZXV0TTBvRFRPS0NURFpJLU1RdWZHVHZsV0VVb1FHUmNFS29sNjFoZkg5MUJlV3FmaE1yd3p1YzNPX0toS2o5YzRyR2Y5YVE5UFQ3NnZQdWpKRmJuR25uWHlTdWJOSzBibkZGR3VKdUlPb0lWSXNpTl9JY3MzRHBDNVc1Tm84ZmlmVnBUTVRPUDN3OW01dWRNSjE5dTluT2xNcnY0ZjY2LVBnRXo1akw1WlVhYlVTZHlSR0g2anFBRi1VTm9jVlA3cEN5U0d6R0Q0LWc0R2FkVHM3WmM2UXozeHQxZVVENjg1dmd2dUhMcGxLQ2tOdjBpVlhnNFRtbVJ1ZmE0TzVrbVBNM3NVX1d3dG1RM1NrNkgyaVJIS2I3Z2RGZDV6U19MSGktS2JfeTA5RS0ybzhFQnBNIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUxaQlZkUHVPY2hMU3laQWVkYU5aQ21xeXZZbjJGQWx5Q2dUUnh1RFBaQVdrZnFxQmQyN0FTQVJ4TUh5YWpkc1pDWkNBdkVIV09qZUtLdjNaQko5bXNhTFpCTFpDRVg4VVEyRHNRM01WODh3b3o2bzVCNTNjVjV0eWVRZWJDbjhnZ2JsMjRNMXFiOEExbEtxUDhiVmpXSWlJaW0xY1RCMUJ6b2RzWEExb1l4TEF6Q3U0cDJlOWIzUVpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2ODUzODM2MzJ9; rur="LDC\05444432295043\0541716919713:01f728d81b7dcb210b9d517cde0016dc5edf62e38dc8102002c7c8251fb877509bc73df4"'
const _userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
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

module.exports = {
    posts
}