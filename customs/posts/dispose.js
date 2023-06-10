const data = require("../tempFiles/posts.json")
const fs = require("fs")

let allPhotos = undefined;
const results = []

if (data.data) {
    allPhotos = data.data.user.edge_owner_to_timeline_media.edges;
}

if (allPhotos) {
    for (let i = 0; i < allPhotos.length; i++) {
        if (i == 6) break;
        const posts = {
            imageUrl: allPhotos[i].node.display_url,
            text: allPhotos[i].node.edge_media_to_caption.edges[0].node.text,
            time: allPhotos[i].node.taken_at_timestamp,
            link: `https://www.instagram.com/p/${allPhotos[i].node.shortcode}/`,
            id: allPhotos[i].node.id
        }
        results.push(posts)
    }

    fs.writeFileSync("./customs/tempFiles/disposedPhotos.json", JSON.stringify(results))
}