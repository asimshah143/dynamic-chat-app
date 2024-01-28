const User = require('../models/userModel');
const bcrypt = require('bcrypt');


const registerLoad = async(req,res)=>{

    try{
        
        res.render('register');

    }catch(error){
        console.log(error.message);
    }
}

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
module.exports= {
    register,
    registerLoad
}