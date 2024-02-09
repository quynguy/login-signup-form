const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();

// convert data into json format
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('view engine', 'ejs');

// static folder path
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});



// Register User
app.post("/signup", async (req, res) => {

    // get data from body > send through sign up form
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // check if user already exists in the database
    const userExists = await collection.findOne({ name: data.name });
    if (userExists) {
        res.send("User already exists. Please choose a different username.");
    } else {
        // hash password (bcrypt)
        const saltRounds = 10;
        const hasedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hasedPassword; // replace hash password with original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
})

// Login User
app.post ("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if(!check) {
            res.send("Unable to locate user. Please sign up.");
        }

        // compare hash password from database to plain text 

        const passwordMatch = await bcrypt.compare(req.body.password, check.password);
        if (passwordMatch) {
            res.render("home");

        } else {
            req.send("Incorrect password. Please try again.");
        }
    }catch{
        res.send("Unable to locate user. Please sign up.");
    }

});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})