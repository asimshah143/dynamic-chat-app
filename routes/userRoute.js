const express = require('express');
const user_route = express();

const bodyparser = require('body-parser');

const session = require('express-session');
const { SESSION_SECRET } = process.env;
user_route.use(session({secret: SESSION_SECRET}))

user_route.use(bodyparser.json());
user_route.use(bodyparser.urlencoded({extended: true}));

user_route.set('view engine','ejs');
user_route.set('views','./views');

user_route.use(express.static('public'));

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/images'))
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname
        cb(null,name);
    }
});

const upload = multer({storage:storage});

const userController = require('../controllers/userController');

user_route.get('/register', userController.registerLoad);
user_route.post('/register', upload.single('image'), userController.register);

user_route.get('/', userController.loadLogin);
user_route.post('/', userController.login);
user_route.post('/logout', userController.logout);

user_route.get('/dashboard', userController.loadDashboard);

user_route.get('*',(req,res)=>{
    res.redirect('/');
})

module.exports = user_route;
