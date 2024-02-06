const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')  // Corrected model name
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mydb');

app.get('/hello', (req, res) => {
    res.send('hello world !')
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,  // Corrected typo in req.body.email
            password: req.body.password,
        });
        res.json({ status: 'ok' })
    } catch (err) {
        console.error(err);
        res.json({ status: 'error', error: 'Duplicate email' });
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })

        if (user) {
            const token = jwt.sign({
                email: user.email,
                name:user.name,
            },'secret123')
            return res.json({ status: 'ok', user: token })
        } else {
            return res.json({ status: 'error', error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.json({ status: 'error', error: 'Internal server error' });
    }
})

app.listen(1337, () => {
    console.log("Server started at port 1337");
})
