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





















/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------- All Tracks ------------------------------- */
app.get('/', async (req,res) => {
    try {
        res.render(('index.ejs'))
        console.log('I am working')
    } catch (err) {
        res.status(200)
    }
});

/* -------------------------------- New Track ------------------------------- */
app.get('/new', async (req, res) => {
    try {
        res.render('tracks/new.ejs')
    } catch (err) {
        res.status(201)
    }
})




app.listen(3000, () => {
    console.log('The express app is ready')
})