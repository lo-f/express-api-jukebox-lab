const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express() 
const mongoose = require('mongoose')
const cors = require('cors')
const methodOverride = require('method-override')
const Track = require('./models/Track')

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(methodOverride('_method'))

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})


/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------- All Tracks ------------------------------- */
app.get('/tracks', async (req,res) => {
    try {
        const track = await Track.find()
        res.json(track)
    } catch (err) {
        res.status(200)
    }
});

/* -------------------------------- New Track ------------------------------- */
app.post('/tracks', async (req, res) => {
    try {
        const track = await Track.create({
            title: req.body.title,
            artist: req.body.artist
        })
        res.json({track})
    } catch (err) {
        res.status(201)
    }
})


app.listen(3000, () => {
    console.log('The express app is ready')
})