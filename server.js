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

/* ---------------------------- Show Single Track --------------------------- */
app.get('/tracks/:id', async (req, res) => {
    try {
        const foundTrack = await Track.findById(req.params.id)
        res.json({ track: foundTrack})
    } catch (err) {
        res.status(200)
    }
})

/* ----------------------------- Update a Track ----------------------------- */
app.put('/tracks/:id', async (req, res) => {
    try {
        await Track.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/tracks/${req.params.id}`)
    } catch (err) {
        res.status(200)
    }
})

/* ----------------------------- Delete a Track ----------------------------- */
app.delete('/tracks/:id', async (req, res) => {
    await Track.findByIdAndDelete(req.params.id)
    res.redirect('/tracks')
})

app.listen(3000, () => {
    console.log('The express app is ready')
})