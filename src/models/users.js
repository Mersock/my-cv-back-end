import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema;

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
    },
    imagesUrl:{
        type:String,
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
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
    user.password = await bcrypt.hashSync(user.password, process.env.SECRET_PASSWORD)
    next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
    const user = this.getUpdate()
    if (user.$set.password) {
        user.$set.password = await bcrypt.hash(user.$set.password, 10)
    }
    next()
})

userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', userSchema, 'users')

export default User