const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){
    res.send('');
})

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title : String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res){
    Article.find({}, function(err, result){
        if(!err){
            res.send(result);
        }
        else{
            res.send(err);
        }
    })
})

app.listen(3000, function(){
    console.log('server running at port 3000');
})