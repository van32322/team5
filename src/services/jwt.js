const jwt = require('jsonwebtoken')
require('dotenv').config()
const generalAccessToken =async (payload) => {
    console.log('payload',payload)
    const access_token = jwt.sign({
        payload
    },process.env.ACCESS_TOKEN,{expiresIn:'365d'})
    console.log(access_token)
    return access_token
}
const generalrefreshToken = async(payload) =>{
    console.log('payload',payload)
    const refresh_token = jwt.sign({
        payload
    },process.env.REFRESH_TOKEN,{expiresIn:'365d'})
    console.log(refresh_token)
    return refresh_token
}
module.exports={
    generalAccessToken,
    generalrefreshToken
}