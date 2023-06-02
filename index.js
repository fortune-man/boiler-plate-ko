const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://wnguddl96:abcd1234@boilerplate.isywfmu.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true,
    }).then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('안녕하세요')
})

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})