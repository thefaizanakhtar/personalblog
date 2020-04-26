const express = require('express');
const router = express.Router();
const Registration = require('../models/registration')
const Contact = require('../models/contactus')
const Post = require('../models/post')
const mongoose = require('mongoose')

// Routes

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login', (req,res)=>{
  res.render('sign')
}); 

router.get('/resume',(req,res)=>{
  res.render('resume')
})

router.get('/contact',(req,res)=>{
  res.render('contact')
})

router.get('/blog',(req,res)=>{
  res.render('blog')
})

router.post('/blog',(req,res)=> {
  const post = new Post({
    post_title: req.body.title,
    post_description: req.body.body
})

  post.save()
  .then(data => {
    res.redirect('/posts')
  })
  .catch(err => {
    throw new Error(err)
  })

})

router.get('/posts',(req,res)=> {
  Post.find({},(err,data)=>{
    if (err) throw err;
    res.render('posts',{data})
  })
})

router.post('/contact',(req,res)=>{
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message

  const contacts = new Contact({
    _id: new mongoose.Types.ObjectId,
    email: email,
    name: name,
    message: message
  })

  contacts.save()
  .then(done =>{
    console.log(done)
    res.redirect('/')
  })
  .catch(err=>{console.log(err)})
})

router.post('/login',(req,res)=>{

  const email = req.body.email
  const password = req.body.password
  Registration.findOne({email:email})
  .then(user =>{
      if(!user){
          res.render('login')
      }
      Registration.findOne({password: password})
      .then(checkedUser =>{
        res.redirect('/blog')          
      })
      .catch(err=>{
          console.log(err);
          
      })
  })
  .catch(err=>{console.log(err);
  })
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',(req,res)=>{
  const user = new Registration({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName : req.body.lastName,
    email: req.body.email,
    password : req.body.password
  })

  user.save().then(result => {
    res.redirect('/login')
  }).catch(err => {
    console.log(err)
  })

})

//Contactus 
  router.post('/contactus',(req,res)=>{
  const user = new Contactus({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    name: req.body.name,
    message: req.body.message,
  })

  user.save().then(res => {
    return
    res.status(200).json({msg: "Message Sent"})
  }).catch(err => {
    console.log(err)
  })
})



module.exports = router