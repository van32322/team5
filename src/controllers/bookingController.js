const booking = require("../models/booking")
const { getBookingService ,CreateBookingService} = require("../services/bookingService")
const postCreateBooking = async(req,res) =>{
    const {patientId,doctorId,date,timeType,statusId} = req.body
    const data = {
        patientId,
        doctorId,
        date,
        timeType,
        statusId
    }
    let booking = await CreateBookingService(data);
    if(!booking){
        return res.status(400).json({
            EC: 1,
            EM: "lỗi"
          });
        }
        return res.status(200).json({
          EC: 0,
          data: booking
        });
    }
const getBooking = async (req,res) =>{
    const data = await getBookingService()
    return res.status(200).json(data)
} 

module.exports = {
    postCreateBooking,getBooking
}