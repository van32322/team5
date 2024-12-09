
const mongoose = require('mongoose')
const AvatarSchema = new mongoose.Schema({
    image:String
})
const Avatar = mongoose.model('avatar',AvatarSchema)
module.exports=Avatar