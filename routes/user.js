const router = require("express").Router();
const multer  = require('multer');
const upload = multer();
const uniqid = require('uniqid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync', {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
  });

router.post("/register",upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));
    const { name, email, password } = request.body;
    error = "";
    if(name === "")
        error += 'Поле Имя обязательно для заполнения. ';

    if(email === "")
        error += 'Поле E-Mail адрес для заполнения. ' ;

    if(password === "")
        error += 'Поле Пароль обязательно для заполнения.';
    
    if(error !== "")
        response.json({success: false, error});
    let user = db.get("users").find({email}).value();
    if(!user){
        user = { name, email, password, id:uniqid() };

        db.get("users").push(user).write();
        request.session.id = user.id;

        response.json({success: true, user});
    }
    else{
        response.json({success: false, error: `E-Mail адрес ${email} уже существует.`});
    }
})

router.post("/login",upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));
    const { email, password } = request.body;
    let user = db.get("users").find({email, password});
    let foundedUser = user.value();
    if(!!foundedUser){
        request.session.id = foundedUser.id;
        response.json({success: true, user: foundedUser});
    }
    else
        response.json({success: false, error:`Пользователь c email ${email} и паролем ${password} не найден`});
})


router.post("/logout", function(request, response) {
    if (request.session.id) {
        delete request.session.id;
        response.json({success: true});
    } else {

        response.json({success: false, error: 'Пользователь не авторизован'});
    }
})

router.get("/current", function(request, response) {
    const db = low(new FileSync('db.json'));
    let { id } = request.session;
    let user = db.get("users").find({id});
    let userValue = user.value();
    if(userValue){
        delete userValue.password;
        response.json({success: true, user: userValue});
    }
    else{
        response.json({success: false, user: null, error: 'Пользователь не авторизован'});
    }
})


module.exports = router;