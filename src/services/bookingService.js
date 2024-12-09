require("dotenv").config;
const Booking = require("../models/booking")
const CreateBookingService = async(data) =>{
    try {
        const {patientId,doctorId,date,timeType,statusId} = data
        let result = await Booking.create({
            patientId,
            doctorId,
            date,
            timeType,
            statusId
        })
        return result;
    } catch (error) {
        console.log(error);
    return {
      EC: 1,
      EM: "lỗi"
    };
  }
}
const getBookingService = async () =>{
    try {
        let result = await Booking.find({})
        return result
    } catch (error) {
        console.log(error);
        return null
    }
}
module.exports = {
    CreateBookingService,getBookingService
}