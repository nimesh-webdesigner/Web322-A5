const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
var path = require("path");
const Article = require('./models/article')

//Routes
const userRouters = require('./routes/user')

const app = express();

// Mongoose db connect
mongoose.connect('mongodb://127.0.0.1:27017/blog');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})



// View Engine
app.use(expressLayouts);
app.set('view engine','ejs')

// Route
app.get('/', async (req, res)=>{
    const article = await Article.find();
    res.render('index',{article:article})
})

// Body Parser
app.use(express.json);
app.use(express.urlencoded({extended:true}))

// userRouters
app.use('/article',userRouters)

// Public folder for css and js
app.use(express.static("public"));

// Port
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log('Working on Port 8080')
})