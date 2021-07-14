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

app.route("/articles")

.get( function(req, res){
    Article.find({}, function(err, result){
        if(!err){
            res.send(result);
        }
        else{
            res.send(err);
        }
    })
})

.post( function(req, res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })
    newArticle.save(function(err){
        if(!err){
            console.log("Successfully added new article");
        }
        else{
            console.log(err);
        }
    });
})

.delete( function(req, res){
    Article.deleteMany({}, function(err){
        if(!err){
            res.send("Successfully deleted all the articles!");
        }
        else{
            res.send(err);
        }
    });
});

app.route("/articles/:articleTitle")

.get(function(req, res){

    Article.findOne({title: req.params.articleTitle}, function(err, result){
        if(!err){
            res.send(result);
        }
        else{
            res.send(err);
        }
    })
})

.put(function(req, res){

    Article.update({title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {owerwrite:true},
        function(err, result){
            if(!err){
                res.send("successfully updated article!");
            }
            else{
                res.send(err);
            }
        })
})

.patch(function(req, res){
    Article.update({title: req.params.articleTitle},
        {$set: req.body}, 
        function(err, result){
            if(!err){
                res.send("successfully updated article!");
            }
            else{
                res.send(err);
            }
        })
})

.delete(function(req, res){
    Article.deleteOne({title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("successfully deleted article!");
            }
            else{
                res.send(err);
            }
        });
});

app.listen(3000, function(){
    console.log('server running at port 3000');
})