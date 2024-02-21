const User = require('../models/userModel');
const bcrypt = require('bcrypt');


const registerLoad = async(req,res)=>{

    try{
        
        res.render('register');

    }catch(error){
        console.log(error.message);
    }
};

const register = async(req,res)=>{
    try{
        const salt = 10;
        const passwordString= req.body.password.toString();
        const passwordHash = await bcrypt.hash(passwordString,salt);

       const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: 'images/'+req.file.filename,
            password:passwordHash
        });

        await user.save();
        
        res.render('register',{ message: 'your Registeration has been completed!' })

    }catch(error){
        console.log(error.message);
    }
}

const loadLogin = async(req,res)=>{

    try{
        
        res.render('login');
    }catch(error){
        console.log(error.message);
    }
}
const login = async(req,res)=>{

    try{
        
        const email = req.body.email;
        const password = req.body.email;

        const userData = await User.findOne({email:email});
        if(userData){
           const passwordMatch = bcrypt.compare(password, userData.password);
           if(passwordMatch){
                req.session.user =userData;
                res.render('dashboard')
           }else{
               
               res.render('login',{message:'Email and password is incorect'});
           }
        }else{
            res.render('login',{message:'Email and password is incorect'});
        }

    }catch(error){
        console.log(error.message);
    }
}
const logout = async(req,res)=>{

    try{
        req.session.destroy();
        res.redirect('/')
        

    }catch(error){
        console.log(error.message);
    }
}
const loadDashboard = async(req,res)=>{

    try{
        res.render('dashboard',{ user: "hello" })

    }catch(error){
        console.log(error.message);
    }
}
module.exports= {
    register,
    registerLoad,
    loadDashboard,
    loadLogin,
    login,
    logout
}