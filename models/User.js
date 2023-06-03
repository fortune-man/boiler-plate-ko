const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 20
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)
            user.password = hash
            next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, callBack) {

    //plainPassword 1234567 <-> db정보(암호화된 비밀번호)
    // 암호화후 비교해야함
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callBack(err),
        callBack(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callback) {
    
    var user = this;
    
    //jsontoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id, `secretToken`)

    user._id + 'secretToken' = token

    user.toKen = token
    user.save(function(err, user {
        if(err) return callback(err)
        callback(null, user)
    }))

    `secretToken` -> user._id
}

const User = mongoose.model('User', userSchema);

module.exports = { User };