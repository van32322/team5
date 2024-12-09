const Booking = require("../models/booking")
const {postBookAppointmentService,postVerifyBookAppointmentService}=require("../services/patientService")
const postBookAppointment = async(req,res)=>{
    try {
        const infor = await postBookAppointmentService(req.body)
        return res.status(200).json(infor)
    } catch (error) {
        return res.status(400).json({
            error:1,
            message:error.message
        })
    }
}
const postVerifyBookAppointment = async(req,res)=>{
    try {
        const infor = await postVerifyBookAppointmentService(req.body)
        return res.status(200).json(infor)
    } catch (error) {
        return res.status(400).json({
            error:1,
            message:error.message
        })
    }
}
module.exports={
    postBookAppointment,postVerifyBookAppointment
}