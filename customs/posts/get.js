const request = require('request')
const fs = require("fs");
const dispose = require("./dispose");

const headers = {
    "cookie": 'ig_did=F829A967-4B3F-4CFE-AF14-6221069E695A; ig_nrcb=1; mid=ZIRXOgALAAHrCVP8UsWRbA5aFTOa; datr=OleEZJdW1AIszsFbYuxr-uvp; ds_user_id=44432295043; csrftoken=ttrjHDvm8ik7W0Jkhf15YBUTHRHQSEkf; sessionid=44432295043%3Am5kbqGbnUoLi4H%3A1%3AAYezFUoQWi_hoUu4GjOIWyOcgl6C2JRwjO5YW3U5hg; shbid="3462\05444432295043\0541719437679:01f755a861e774413886e1504acab65c1c80ffab9bbf89f005ba7d48890de5bce594ced5"; shbts="1687901679\05444432295043\0541719437679:01f7eaaf1faaab6c4f2f978f1894d6bdac8f918e20e966e7e8b88e0d8727832a519eb3aa"; rur="LDC\05444432295043\0541719437684:01f71ce1badd38e2768a9ab6cbb55251319e8d5a9434844037292fc280c23d5da618f21a"',
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "x-ig-app-id": "936619743392459"
}
const url = "https://www.instagram.com/api/v1/users/web_profile_info/?username=adores.fsh";
const options = {
    url,
    headers
}
try{
request(options, async (error, res, body) => {
    if(await body){
    fs.writeFileSync("./customs/tempFiles/posts.json", await body);
    }
})
} catch(err){
    console.log(err)
}
dispose;