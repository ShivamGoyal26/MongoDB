const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    record: { type: String, required: true },
    date: {
        type: Number, default: () => {
            return Date.now()
        }
    }
})

const model = mongoose.model('TodoModel', TodoSchema)  // Here we are creating the collection sort of thing in the mongoDB

module.exports = model