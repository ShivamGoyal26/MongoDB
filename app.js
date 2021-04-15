const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const Todo = require("./models/Todo")

//Connect to the mongoDB
mongoose.connect('mongodb://localhost/firstmongo')

// parse json
app.use(express.json())

app.use('/', express.static(path.join(__dirname, 'assets')))

app.post('/api/modify', async (req, res) => {
    const { old: oldTitle, new: newTitle } = req.body
    const response = await Todo.updateOne({
        record: oldTitle
    }, {
        $set: { record: newTitle }
    })
})

app.post('/api/delete', async (req, res) => {
    const { record } = req.body
    const response = await Todo.deleteOne({ record })
    res.json({ status: "ok" })
})

app.get('/api/get', async (req, res) => {
    const records = await Todo.find({})
    res.json(records)
})

app.post('/api/create', async (req, res) => {
    const record = req.body
    // Response from MongoDB database server 
    const response = await Todo.create(record)
    console.log(">>>>>", response)
    res.json({ status: 'ok' })
})

app.listen(13371, () => {
    console.log('Server Up')
})