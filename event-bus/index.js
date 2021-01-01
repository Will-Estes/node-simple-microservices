const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());


const events = [];


app.post('/events', async (req, res) => {
    const event = req.body;
    console.log('event received...', event.type);

    events.push(event);

    try {
        await axios.post('http://posts-clusterip-srv:4000/events', event);
        console.log('Event sent to Posts Service');
    } catch (err) {
        console.log('Failed to send to Posts Service');
    }

    try {
        await axios.post('http://comments-srv:4001/events', event);
        console.log('Event sent to Comments Service')
    } catch (err) {
        console.log('Failed to send to Comments Service');
    }

    try {
        await axios.post('http://query-srv:4002/events', event);
        console.log('Event sent to Query Service');
    } catch (err) {
        console.log('Failed to send to Query Service');
    }

    try {
        await axios.post('http://moderation-srv:4003/events', event);
        console.log('Event sent to Moderation Service');
    } catch (err) {
        console.log('Failed to send to Moderation Service');
    }

    res.send({status: 'OK'});
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('Event bus listening on 4005');
})