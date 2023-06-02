const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

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


app.listen(port, () => {
    console.log('Example app listening on port ${port}');
})