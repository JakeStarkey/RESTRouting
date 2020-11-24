const express = require("express");
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({extended:true}));
// This line is to show req.body urlencoded info via POST method
app.use(express.json({extended:true}));
// This line is to show req.body JSON info via POST method
app.use(methodOverride('_method'));
// This is for overriding the method to use patch,delete, etc. called with what's in the '()'s
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let comments = [
    {   
        id: uuid(),
        username:'Todd',
        comment: 'lol that is so funny'
    },
    {   
        id: uuid(),
        username:'Skyler',
        comment: 'Plz delete ur account, Todd'
    }, 
    {  
        id: uuid(), 
        username:'Brian',
        comment: `I really can't think of any better names`
    },
    {   
        id: uuid(),
        username:'barkerino',
        comment: 'bark bark'
    }
]
// This is the array of comments
// uuid() is UUID creating unique IDs for each object

app.get('/comments', (req,res) =>{
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req,res) =>{
    res.render('comments/new')
})

app.post('/comments', (req,res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    // This line will add the information from the form to the array using the variable names
    res.redirect('/comments');
    // redirect requires an http path, not the path scheme ejs uses
})

app.get('/comments/:id', (req, res)=>{
    const {id} = req.params;
    // Because we only need the ID of the post, we are only finding the ID
    const comment = comments.find(c => c.id === id);
    // This line finds the comment with the ID called from the comments array
    // using UUID to create the initial ID
    // const id and const comment are kind of bound to each other to find the ID
    if(comment) {
        res.render('comments/show', {comment});
    } else {
        res.send("Looks like I couldn't find that comment")
    }
})

app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment});
})

app.patch('/comments/:id', (req,res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    //  finds 'comment' that were sent in by the user and assigns it to a variable
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    // Changes the 'comment' from the original post and updates it to the newly sent information
    res.redirect('/comments');
})

app.delete('/comments/:id', (req,res)=>{
    const {id} = req.params;
    comments = comments.filter( c => c.id != id);
    res.redirect('/comments');
})



app.get('/tacos', (req,res) => {
    res.render("tacos")
})

app.get('/tacos/methodres', (req,res) => {
    res.send("GET /tacos response")
})

app.post('/tacos/methodres', (req,res) => {
    const {meat, qty} = req.body;
    // req.body is how to extract information sent via POST
    // The variables are named to match the name of the form options
    res.send(`Okay, here's your ${qty} ${meat} taco(s).`);
})

app.listen(3000, () => {
    console.log("listening on port 3000.")
})