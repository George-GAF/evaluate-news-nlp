const dot = require("dotenv")
const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const console = require("console")
const cors = require('cors');
const port = 8081;
const app = express();
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

dot.config()

app.use(express.static('dist'))
app.use(cors());
app.use(express.json())

console.log(__dirname)

app.post("/link", async (req, res) => {
    const url = req.body.url;
    const apiKey = process.env.API_KEY;
    const siteData = await fetch(
        `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${url}&lang=en`
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
    const { agreement,
        confidence,
        irony,
        model,
        score_tag,
        subjectivity,
        status,
    } = siteData;
    res.status(200).json({
        agreement,
        confidence,
        irony,
        model,
        score_tag,
        subjectivity,
        status,
    });
});

app.listen(port, () => {
    console.log(`API KEY : ${process.env.API_KEY}`)
    console.log(`Example app listening on port ${port}`)
})
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/', function (req, res) {
    console.log(`API KEY : ${process.env.API_KEY}`)
    res.sendFile(path.resolve("dist/index.html"));
});
