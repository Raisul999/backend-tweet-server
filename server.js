const express = require('express')
const cors = require('cors');
const axios = require('axios');
const { ETwitterStreamEvent, TweetStream, TwitterApi, ETwitterApiError } = require('twitter-api-v2');
const app = express()

app.use(cors())
app.use(express.json());

const PORT = 5000;

// app.get('/', (req,res)=>{
//     res.send('Hello World!');
// })


    
    

const server = async () => {
   
    // const { channel, keyword } = req.body

    // console.log(channel, keyword)

    const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAACAhiwEAAAAAKYLu5uGcWXgL1zFGLNML5VjNDi4%3DM75PwdAE3ikXwXkAmm7lYesLhrR21ax5KV2CSVQMJ7hieUig2w');


    const stream = await client.v2.searchStream();

    // const deleteRules = await client.v2.updateStreamRules({
    //     delete: {
    //         ids: ['1587685212011757569'],
    //     },
    // });

    // console.log(deleteRules)

    
    let data
    stream.on(
        // Emitted when a Twitter payload (a tweet or not, given the endpoint).
        ETwitterStreamEvent.Data,
        async eventData => {
            console.log('Twitter has sent something:', eventData)
            data = eventData.data
            await axios.post('https://n8n-training.up.railway.app/webhook-test/twitter-stream', {
                eventData
    })
        },
    );

    
}


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    server()
})