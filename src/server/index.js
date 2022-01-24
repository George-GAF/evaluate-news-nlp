const dot = require("dotenv")
const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const console = require("console")

dot.config()
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 8000;
app.use(express.json())
app.use(express.static('dist'))

app.post("/", async (req, res) => {

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
    console.log(`Example app listening on port ${port}`)
})
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

