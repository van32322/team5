const Booking = require("../models/booking");
const User = require("../models/user");
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const{sendSimpleEmail} = require('../services/emailService')

const buildUrlEmail =(doctorId,token)=>{
    const results =`${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return results
}
const postBookAppointmentService = async (data) => {
    try {
        // Kiểm tra xem email có được cung cấp không
        if (!data.email || !data.doctorId || !data.timeType || !data.date) {
            return {
                data: null,
                errCode: 1,
                errMessage: 'Email không được cung cấp'
            };
        }
        const token = uuidv4();
         await sendSimpleEmail({
            reciverEmail:data.email,
            patientName:'trần vĩ',
            time:'Morning',
            doctorName:'Goat',
            redirectLink:buildUrlEmail(data.doctorId,token)
         })
        // Tìm người dùng theo email
        let user = await User.findOne({ email: data.email });
        
        // Nếu không tìm thấy người dùng, tạo người dùng mới
        if (!user) {
            // Kiểm tra xem có đủ thông tin để tạo người dùng mới không
            if (!data.name || !data.password) {
                return {
                    data: null,
                    errCode: 1,
                    errMessage: 'Tên và mật khẩu là bắt buộc để tạo người dùng mới'
                };
            }

            user = await User.create({ 
                email: data.email, 
                password: data.password, // Cung cấp password
                name: data.name,         // Cung cấp name
                roleId: 'R3' 
            });
        }

        // Kiểm tra xem người dùng đã có lịch hẹn chưa
        const existingBooking = await Booking.findOne({
            patientId: user._id,
            date: data.date,
            timeType: data.timeType
        }).select('-_id -patientId -doctorId');
        if (existingBooking) {
            return {
                data: null,
                errCode: 1,
                errMessage: 'Người dùng đã có lịch hẹn vào thời gian này!'
            };
        }
        else if (!existingBooking) {
            // Tạo bản ghi mới nếu không tìm thấy lịch hẹn
            const newBooking = await Booking.create({
                statusId: data.statusId || 'New', // Sử dụng statusId từ data hoặc mặc định là 'New'
                doctorId: data.doctorId,
                patientId: user._id,
                date: data.date,
                timeType: data.timeType,
                token:token
            });

            return {
                data: newBooking,
                errCode: 0,
                errMessage: 'Lưu thông tin cho bác sĩ thành công!'
            };
         }
    } catch (error) {
        return {
            data: null,
            errCode: 1,
            errMessage: 'Lỗi khi lưu người dùng: ' + error.message
        };
    }
};
const postVerifyBookAppointmentService = async (data) => {
    try {
        // Kiểm tra xem token và doctorId có được cung cấp không
        if (!data.token || !data.doctorId) {
            return {
                data: null,
                errCode: 1,
                message: 'Token and doctorId are required'
            };
        } else {
            // Tìm kiếm cuộc hẹn với doctorId và token
            const appointment = await Booking.findOne({
                doctorId: data.doctorId,
                token: data.token,
                statusId: 'New'
            });

            if (appointment) {
                // Cập nhật trạng thái cuộc hẹn
                appointment.statusId = "Confirmed"; // Cập nhật trạng thái
                await appointment.save(); // Lưu thay đổi

                return {
                    errCode: 0,
                    message: 'Update the appointment succeeded'
                };
            } else {
                return {
                    errCode: 2,
                    message: 'Appointment has been activated or does not exist'
                };
            }
        }
    } catch (error) {
        return {
            errCode: 3,
            message: error.message || 'An error occurred while verifying the appointment'
        };
    }
};
module.exports = {
    postBookAppointmentService,postVerifyBookAppointmentService
};