const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

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


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})