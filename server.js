const express = require('express')
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv').config()
const { ETwitterStreamEvent, TweetStream, TwitterApi, ETwitterApiError } = require('twitter-api-v2');
const app = express()

app.use(cors())
app.use(express.json());

const PORT = 5000;



const server = async () => {

    // const { channel, keyword } = req.body

    // console.log(channel, keyword)

    const client = new TwitterApi(process.env.TWITTER_TOKEN);


    const stream = await client.v2.searchStream();




    let data
    stream.on(
        // Emitted when a Twitter payload (a tweet or not, given the endpoint).
        ETwitterStreamEvent.Data,
        async eventData => {
            console.log('Twitter has sent something:', eventData)
            data = eventData.data
            await axios.post('https://n8n-training.up.railway.app/webhook/twitter-stream', {
                eventData
            })
        },
    );


}


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    server()
})