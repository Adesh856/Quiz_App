const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    quizzes:[
        {type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'}
    ]
});

 

module.exports = mongoose.model('User', userSchema);
