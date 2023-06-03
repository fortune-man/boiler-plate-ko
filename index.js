const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')

mongoose.connect('config.mongoURI', {
        useNewUrlParser: true, useUnifiedTopology: true,
    }).then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('joohyeong api for problem solving')
})


app.post('/register', (req, res) => {
    
    // 회원 가입할 때 필요한 정보들을 
    // Client에서 가져오면 
    // 그것들을 DB에 저장한다
    const user = new User(req.body)

    // callback function
    user.save().then(()=>{
        res.status(200).json({
            success:true
        })
    }).catch((err)=>{
        return res.json({success:false,err})
    })
})

app.post('/login', (req, res) => {
    // 요청 이메일 DB에서 조회
    User.findOne({email: req.body.email}, (err, userInfo) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일과 일치하는 사용자가 없습니다."
            })
        }
        // 조회된 경우 비밀번호 일치여부 검증
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess:false, message: "비밀번호가 틀렸습니다."})
            
            // 요청 이메일 && 비밀번호 일치한 경우 토큰 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                
                // 토큰을 저장한다


            })
        })
        


    })
    
})


app.listen(port, () => {
    console.log('Example app listening on port ${port}');
})