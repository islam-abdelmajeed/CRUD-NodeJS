const express = require("express")
const mongoose = require('mongoose');
const app = express()
const port = 3000;

const Article = require("./models/article")


mongoose.connect("mongodb+srv://islam_majeed:koko1998@cluster0.aj4hilc.mongodb.net/?retryWrites=true&w=majority").then(()=>{
     console.log("connected successfully")
}).catch((error)=>{
     console.log("error with connected", error)
})
// mongodb+srv://islam_majeed:<password>@cluster0.aj4hilc.mongodb.net/?retryWrites=true&w=majority
app.use(express.json())

app.get("/", (req, res, next)=>{
     res.send("Get Request");
})

app.post("/addComment", (req, res, next)=>{
     res.send("Post Request");
})

app.put("/editComment", (req, res, next)=>{
    
     res.send("Put Request");
})

app.delete("/deleteComment", (req, res, next)=>{
     res.send("Delete Request");
})

//path parameter
app.get("/findSum/:num1/:num2", (req, res, next)=> {
    const num1=  req.params.num1; 
    const num2=  req.params.num2;

    const total = Number(num1) + Number(num2);
    //     res.send(`The total is ${total}`);

    res.render("numbers.ejs", {
     total: total, 
     firstNum: num1,
     secondNum: num2,
    });
})
//query parameter
app.get("/findSum", (req, res, next)=> {
    const {age} = req.query;
    console.log(age)

    res.send(`The age is ${age}`);
})

//body parameter
app.post("/sayHello", (req, res, next)=>{
     const {name} = req.body;
     
     res.send(`Hello ${name}`);
})


// ====== Articles Endpoint =========

app.post("/articles", async (req, res, next)=>{

     const newArticle = new Article();
const  {title , body} = req.body;
     
     newArticle.title = title;
     newArticle.body = body;
     newArticle.numberOfLikes = 0;
     await newArticle.save();

     res.json(newArticle);
})

app.get("/articles", async (req,res, next)=> {
     const articles= await Article.find();
     res.json({articles});
})

app.get("/articles/:articleId", async (req,res, next)=> {
     const {articleId} = req.params;
     console.log(articleId);
     const article = await Article.findById(articleId);
     res.json(article);
})

app.delete("/articles/:articleId", async (req,res, next)=> {
     const {articleId} = req.params;
     console.log(articleId);
     const article = await Article.findByIdAndDelete(articleId);
     res.json(article);
})


app.listen(port, ()=> {
     console.log(`I am listening at port ${port}`);
})