const request = require('request')
const fs = require("fs");
const dispose = require("./dispose");

const headers = {
    "cookie": 'ig_did=F829A967-4B3F-4CFE-AF14-6221069E695A; ig_nrcb=1; mid=ZIRXOgALAAHrCVP8UsWRbA5aFTOa; datr=OleEZJdW1AIszsFbYuxr-uvp; dpr=0.5; csrftoken=WD2G4225dB6wEJMpWgtwEK4gqZBNbANQ; ds_user_id=44432295043; sessionid=44432295043%3AwCndDZI6xJ9EL5%3A9%3AAYc0ZmX2PlhI_ufNVF4jqplojrG_1ywpx68FB898-A; shbid="3462\05444432295043\0541717930938:01f70a992330bbda95befaad97b5d37721dc5eba9cc2f14e35a8df68d18b59d96908ea15"; shbts="1686394938\05444432295043\0541717930938:01f77fd37cc3ae945b95ac26cdb38e7d9086aa97826bf6207a016dd529c502c87b3ffa71"; rur="LDC\05444432295043\0541717931119:01f7a9a5742da90f30e29ec1c6b82a1da7a47685637750b726d0d541e0de22f47dd3e0a1"',
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
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