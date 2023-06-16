const request = require('request')
const fs = require("fs");
const dispose = require("./dispose");

const headers = {
    "cookie": 'ig_did=F829A967-4B3F-4CFE-AF14-6221069E695A; ig_nrcb=1; mid=ZIRXOgALAAHrCVP8UsWRbA5aFTOa; datr=OleEZJdW1AIszsFbYuxr-uvp; dpr=0.5; ds_user_id=44432295043; csrftoken=YpTuejXM9mpncZUKeXuB2ppTbIkg1BPH; sessionid=44432295043%3A7gW75X6InQKgin%3A9%3AAYdHNMKvcRyxUDHyNRYBggyoOKqTqWO9Y7a2YmMF4Q; shbid="3462\05444432295043\0541718457603:01f7ee8527324b9c1b393046864d9c2d4ea7cc5ca4fa00a4333ecdc42ca344c72d63b137"; shbts="1686921603\05444432295043\0541718457603:01f772e154560c9773bf03d97e9610a3679570d824340a16d2d4e4dd0780dd51f18e2212"; rur="LDC\05444432295043\0541718457670:01f7ed81b0d5cc13d7be39e6b7187ca3a13542ae2fc94a0c3f0ec3adaaebe66deaf800fa"',
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "x-ig-app-id": "936619743392459"
}
const url = "https://www.instagram.com/api/v1/users/web_profile_info/?username=adores.fsh";
const options = {
    url,
    headers
}
try{
request(options, async (error, res, body) => {
    if(body){
    fs.writeFileSync("./customs/tempFiles/posts.json", await body);
    }
})
} catch(err){
    console.log(err)
}
dispose;