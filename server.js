const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express() 
const mongoose = require('mongoose')
const cors = require('cors')
const methodOverride = require('method-override')

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(methodOverride('_method'))

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

const Track = require('./models/Track')


/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------- All Tracks ------------------------------- */
app.get('/tracks', async (req,res) => {
    try {
        res.json({ name: 'test' })
    } catch (err) {
        res.status(200)
    }
});

/* -------------------------------- New Track ------------------------------- */
app.post('/tracks', async (req, res) => {
    try {
        res.json({ name: 'new track test'})
    } catch (err) {
        res.status(201)
    }
})

/* ---------------------------- Show Single Track --------------------------- */
app.get('/tracks/:id', async (req, res) => {
    try {
        const foundTrack = await Track.findById(req.params.id)
        res.json({ string: 'tracks/:id is working'})
        res.json({ track: foundTrack})
    } catch (err) {
        res.status(200)
    }
})

/* ----------------------------- Update a Track ----------------------------- */
app.put('/tracks/:id', async (req, res) => {
    try {
        await Track.findByIdAndUpdate(req.params.id, req.body)
        res.json({string: 'update is working'})
        res.redirect(`/tracks/${req.params.id}`)
    } catch (err) {
        res.status(200)
    }
})

/* ----------------------------- Delete a Track ----------------------------- */
app.delete('/tracks:id', async (req, res) => {
    await Track.findByIdAndDelete(req.params.id)
    res.redirect('/tracks')
    res.json({string: 'delte is working'})
})



app.listen(3000, () => {
    console.log('The express app is ready')
})