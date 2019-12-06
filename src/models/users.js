const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')


const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
}, {
    timestamps: true
});

userSchema.options.toJSON = {
    transform: function (doc, user, options) {
        user.id = user._id
        delete user._id
        delete user.password
        delete user.__v
        return user
    }
}

userSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(user.password, 10)
    next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
    const user = this.getUpdate()
    if (user.$set.password) {
        user.$set.password = await bcrypt.hash(user.$set.password, 10)
    }
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User;