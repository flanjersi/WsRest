const express = require('express')
var http = require('http');

const app = express()


/**
 * When user call the following url with the GET HTTP method : http://localhost:3000/api/posts
 */
app.get('/api/posts',  (req, res) => {

    // Get the posts data from an external api
    http.get('http://jsonplaceholder.typicode.com/posts', (resp) => {
        let postsStr = '';

        resp.on('data', (chunk) => {
            postsStr += chunk;
        });

        resp.on('end', () => {
            let posts = JSON.parse(postsStr);

            // Add the date property to the data
            posts.forEach(function(post) {
                post['date'] = Date.now();
            })

            //To resolve an error
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            res.json(posts);
        });

    }).on("error", (err) => {
        res.json("Error: " + err.message);
    });
});

//Listen on the port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

