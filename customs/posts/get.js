const request = require('request')
const fs = require("fs");
const dispose = require("./dispose")

const headers = {
    "cookie": 'mid=ZHHtNwALAAFhjIXkUfuez44cOUL8; ig_did = 0CAFBA4C - 1695 - 43A3 - B18B - 801EF60EBC7E; ig_nrcb = 1; datr = Nu1xZNu6v4s2o0XQR1VCfrkh; fbm_124024574287414 = base_domain =.instagram.com; shbid = "3462\05444432295043\0541717184593: 01f7dbc551e5a162c4c88f18eddae3489acf902de40a48c4663b400bbfd437d045d663af"; shbts = "1685648593\05444432295043\0541717184593: 01f7eba90d564b049047c3db96be460a6ae22f9d26e6460b6367f88fc2f18658c629f221"; ds_user_id = 44432295043; csrftoken = OEXqtY5MJnAGa7O2U3QP8w88mG5oBG12; sessionid = 44432295043 % 3AKYCfD40sHamEt7 % 3A21 % 3AAYfTsJXLUlmeQ0gBfS0q7TgTe_CYEkI8KHpaKcSn3Q; fbsr_124024574287414 = CbDKJgtyOCqhYUVJFDPZ18dxCASdSJ - cSpucueJN_Bk.eyJ1c2VyX2lkIjoiMTAwMDIxMjgyNDY4NjkyIiwiY29kZSI6IkFRQm5Vd3FTSG4tYnpWQ29WV050SXJ2czZob1dsOUJJOUdMYmFDNnZYanM4THo3dDJxYVh0emVNSjhSRk1rdzd2RHZKNmpXb1AySVhycWZldzd6cHViWXhTNkZndFJwVWtpbnlzcDRaY0lnWmpSTHZfb1Y3dkZGSmhGR0EwWW4xWlJ1NW9jbW9pdEp0Nmh3MXFDX0NER2NDTU9qbTgtUWRobGVqS0dKdmRmbWt1OHVfZUdUcnpXY3ZzZmpZbDJnLVVyZjRJV1NHTHI2N2NET3B3dWt0bndJY3JTcGh2LXFFQ0R2UHZqbUJpUmVObmRuYV9JNEoyODkzaWxGd3BSWjU1SUZkYlc0TlYwS1NxNVpnYktaTHdFWGtXSER2SXJ0XzhLOUF2aV9oNnJrUWxaV1Z5MlZlMFRKTDR2U2lpVWVYNVVzV0N6bE1OYnVLQjktRTJHYWlhYVhzIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUY0WkE5S1pCdkdYZTZaQk43M0V5VXhCUVVXNEoyNXk4cnRIdlpCSE9MTU4xR2RWbzNBcGVhVmNzYTNGYXhRSjBVbElFaVNFSU1aQWNGZ0oxMER3WkJQWkJaQUs3WWo2RzZ4Q2VlVEppWTg4a2ozY1RMMThDRVpDZHgwN3drUkYyVDN6bU10ck02b2laQnRqZHprT0xoVkt5dlBrTjlYZnkxRGZrcVNhR2c4QlpCNXpFZTlkTG1PMUVjWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY4NTgxOTcyMH0; rur = "LDC\05444432295043\0541717355728: 01f706a9efed0796d7a548a18648fbd91683ad834ebd3e01cb7046dfdd5e2ce783288ca8"',
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "x-ig-app-id": "936619743392459"
}
const url = "https://www.instagram.com/api/v1/users/web_profile_info/?username=adores.fsh";
const options = {
    url,
    headers
}
request(options, async (error, res, body) => {
    fs.writeFileSync("./customs/tempFiles/posts.json", await body);
})
dispose;