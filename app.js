const express = require('express');
const app = express();
const path = require('path');   
const {v4: uuid4} = require('uuid');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Qoura = require('./models/Qoura');
uuid4();



main().then( () => {
    console.log("Connected to MongoDB");})
    .catch(err => console.log(err));
    async function main() {
        await mongoose.connect('mongodb+srv://Aditya87:1W4INV38UHHlsCmE@cluster0.9hq90.mongodb.net/quora?retryWrites=true&w=majority&appName=Cluster0');
    }


let port = 8080;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//  let pos = new Qoura({
//       id: uuid4(),
//         username:"Inayat",
//     content: "Hello World"
//  });

//  pos.save().then(() => {
//      console.log("Data Inserted");
//  });


let posts = [
    {id : uuid4(),
     username:"ADITYAJANGID",
     content: "Hello World"
    },

    {
    id:uuid4(),

    username:"Inayat",
    content: "Hello World"
    },

    {
        id:uuid4(),
        username:"Rahul",
        content: "Hello World"
    },

    {
        id:uuid4(),
        username:"AAMIRKHAN",
        content: "YES I AM AAMIR"
    }
];


app.listen(port, () =>{
    console.log(`port is running on ${port}`);
})



//All posts
app.get('/posts', async (req , res) =>{
    let posts = await Qoura.find();
    res.render("index.ejs", {posts});
})



//Write a post
app.get('/posts/new', (req , res ) =>{
    res.render("new.ejs");
}) 

app.post('/posts', (req, res) =>{
       let {username, content} = req.body;
       let newPost = new Qoura({
        id: uuid4(),
        username: username,
        content: content
       });
       console.log(newPost);
       newPost.save();
       res.redirect('/posts');
})




//Show a post
app.get('/posts/:id', async(req, res) =>{ 
    const {id} = req.params;
    let post = await Qoura.findOne({id});
    //  console.log(post[0]); 
     console.log(post.username);
    res.render("show.ejs", {post});
});





//CollegeFinder
app.get('/collegefinder' , (req, res) => {
    res.render("collegefinder.ejs")
 })
 




//Edit a post
app.get('/posts/:id/edit' , async (req,res) => {
    let {id} = req.params;
    let post =  await Qoura.findOne({id});
    // let post = posts.find(p => p.id === id);
    res.render('edit.ejs', {post});
})


app.patch('/posts/:id', async (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    // let post = 
    await Qoura.findOneAndUpdate({id}, {content: newContent}, {runValidators: true, new: true});
    console.log(newContent);
    // let post = posts.find(p => p.id == id);
    // post.content = newContent;
    res.redirect('/posts');
})




//Delete a post
app.delete('/posts/:id', async (req, res) =>{
    let {id} = req.params;
    let DeletedPost = await Qoura.deleteOne({id});
    console.log(DeletedPost);
    // posts = posts.filter(p => p.id !== id);
    res.redirect('/posts');
})



