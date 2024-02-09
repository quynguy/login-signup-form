require('dotenv').config();

const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.MONGO_URL);


// check database connection
connect.then(() => {
    console.log("Database Connection SUCCESSFUL");
})
    .catch(() => {
    console.log("Database Connection FAILED");
});


// Mongoose Schemas

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection parts
const collection = new mongoose.model("users", LoginSchema);
module.exports = collection;
