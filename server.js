const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const { signinHandler } = require('./controllers/signin');
const { profilehandler } = require('./controllers/profile');
const { imageHandler , handleApiCall } = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '04182003o',
      database : 'smart-brain'
    }
  });


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/' , (req, res)=>{
    res.send(database.users);
})

app.post('/signin' , (req , res)=>{signinHandler(req, res , db , bcrypt)})

app.post('/register' , (req , res)=> {register.handleRegister(req,res,db,bcrypt)});


app.get("/profile/:id" , (req, res)=>{profilehandler(req, res , db)})

app.put('/image' , (req,res)=>{imageHandler(req,res,db)})
app.post('/imageurl' , (req,res)=>{handleApiCall(req,res)})


app.listen(3000 , ()=>{
    console.log(`app is running http://localhost:3000/`);
})

/* 
    / --> res = this is working

    /signin --> Post = success // fail

    /register --> Post = new user
    
    /profile/:userId --> Get = user

    /image --> PUT --> updated user

*/