const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    answerOptions: {
        type: [String],
        required: true,
    },
    correctOptions: {
        type: [Number],
        required: true,
    },
});

const quizSchema =  mongoose.Schema({
    creator: {
        type: String,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
        validate: [arrayLimit, 'Quizzes must have between 2 and 10 questions.'],
    },leaderboard: [
        {
          email: {
            type: String,
            required: true
          },
          score: {
            type: Number,
            required: true,
            default: 0
          }
        }
      ]
});

function arrayLimit(val) {
    return val.length >= 2 && val.length <= 10;
}



module.exports = mongoose.model('Quiz', quizSchema);
