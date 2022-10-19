//1. setup epxress app 
//2. integrate with mongo
//3. add jwt security 

const jwt = require('jsonwebtoken')
const mongoose  = require('mongoose');
const express = require('express');
const { chownSync } = require('fs');
const cookieparser = require('cookie-parser')
const {expressjwt} = require('express-jwt')

mongoose.connect('mongodb://localhost:27017/login');


//this is step to create the schema 

//new keyword is used to create the new object object object object
const loginShema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String}
})


//ye syntac neend me bhi yaad rahna chaiye label create karne ka 
const loginUser =  mongoose.model("user", loginShema);
const app = express();



// adding the security 


// const op  = new loginUser({username :'tejas', password: 'admin'})
// op.save();




// we are telling that we are using the json data in the request 
app.post('/login', express.json(), async (req, res)=>{
    const {username, password} = req.body;



    //you can also write by other methods though this is most easy and readable 
    //you got the data in second parameter of the callback first will show the error if there if not will show null
    //if data is not available in the db that you provided using post will show the null 
    loginUser.findOne({username, password}, (err, appuser)=>{
 
        if(err){
            res.json({error: "something went wrong "})
        }


        if(appuser==null){
            res.json({err: "user not found"})
        }
        console.log('bhai mai idhar hu')


        const token  = jwt.sign({...appuser}, 'admin', {algorithm: 'HS256'});
        // console.log(token)
        res.cookie('cookie', token, {httpOnly: true});
        res.json({sts: "login successfully"})
    })


   
})


app.post('/adduser', express.json(), cookieparser(), (req, res)=>{

    // console.log(req.cookies)
    const ver = jwt.verify(req.cookies.cookie, 'admin')
    console.log(ver)
    const {role} = ver._doc;
if(role && role == "admin") res.json({sts: "Yup you can create a new user"})
else res.json({sts: "are tu ja re "})

})
app.listen(3000, ()=>{
    console.log('Server started successfully')
})




//security 


// broken access control 
// when your login component compromised 
// when you forgot to logout in public forum 
// principle means your username and password or token 



//first stratergy 
// denying the request 
//dont show the information from the server 
// rate limiting request algorithm 
//there is package called as rate-limit 




// cryptographic failure 
// your token signed with public keys or passwords that has been already compromised
//for example your secret key for sign the key has been compromised 