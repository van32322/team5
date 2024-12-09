const User = require('../models/user')
const Markdown = require('../models/markdown')
const DoctorInfo = require('../models/doctorinfo')
const {getTopDoctorService,getDoctorInforService, createMultipleSchedule, getScheduleServices,getExtractDoctorServices,getDoctorProfileService} = require("../services/doctorService")
const { date } = require('joi')
const getTopDoctor = async(req,res)=>{
    try {
        const doctors = await getTopDoctorService();
        return res.status(200).json(doctors)
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
const getDoctorInfor = async(req,res)=>{
    try {
        const {id} = req.params;
        const doctorInfor = await getDoctorInforService(id)
        return res.status(200).json(doctorInfor)
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}
const getDoctorProfileId =async(req,res)=>{
    try {
        const {id} = req.params;
        const doctorProfile = await getDoctorProfileService(id)
        return res.status(200).json(doctorProfile)
    } catch (error) {
        return res.status(400).json({
            error:1,
            message:error.message
        })
    }
}
const postCreateScheduleDoctor = async (req, res) => {
    try {
        // Gọi hàm tạo lịch với dữ liệu từ request body
        let infor = await createMultipleSchedule(req.body);
        
        // Kiểm tra nếu có lỗi trong thông tin trả về
        if (infor.error) {
            return res.status(400).json(infor);
        }

        // Trả về phản hồi thành công
        return res.status(200).json(infor);
    } catch (error) {
        console.error('Error creating schedule:', error); // Log lỗi để dễ dàng kiểm tra
        return res.status(500).json({
            message: 'Đã xảy ra lỗi: ' + error.message
        });
    }
};
const getSchedulebyid = async (req, res) => {
    try {
        const {id} = req.params;
        const {date} = req.query; // Lấy doctorId từ query parameters
        // Gọi service để lấy lịch khám
        const result = await getScheduleServices(id,date);    
        // Trả về lịch khám
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
};
const getExtractDoctorInfor = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const doctorinfo = await getExtractDoctorServices(doctorId);
        return res.status(200).json({
            doctorinfo
        });
    } catch (error) {
        return res.status(400).json({
            error: 1,
            message: error.message
        });
    }
};



module.exports = {
    getTopDoctor,getDoctorInfor ,postCreateScheduleDoctor,getSchedulebyid,getExtractDoctorInfor,getDoctorProfileId
}