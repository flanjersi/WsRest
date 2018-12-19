const express = require('express')
var http = require('http');

const app = express()

app.get('/api/posts',  (req, res) => {
    http.get('http://jsonplaceholder.typicode.com/posts', (resp) => {
        let postsStr = '';

        resp.on('data', (chunk) => {
            postsStr += chunk;
        });

        resp.on('end', () => {
            let posts = JSON.parse(postsStr);

            posts.forEach(function(post) {
                post['date'] = Date.now();
            })

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            res.json(posts);
        });

    }).on("error", (err) => {
        res.json("Error: " + err.message);
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

