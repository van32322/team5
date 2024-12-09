const User = require("../models/user")
const Markdown = require("../models/markdown")
const Schedule = require("../models/schedule")
const DoctorInfo = require("../models/doctorinfo")
require('dotenv').config()
const getTopDoctorService = async()=>{
    try {
        const doctors=await User.find(
            {roleid:'R2'},
            {password:0}
        )
        .sort({createdAt:-1})
        .limit(10)
        return doctors
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}
const getDoctorInforService = async (id) => {
    try {
        // Tìm người dùng theo ID
        const user = await User.findById(id).select("-password -_id");
        if (!user) {
            throw new Error('User  not found'); // Thông báo lỗi nếu không tìm thấy người dùng
        }

        // Tìm tất cả các bài viết Markdown liên quan đến người dùng
        const markdowns = await Markdown.find({ doctorId: id }).select("-_id -doctorId");
        const doctorInfo = await DoctorInfo.find({ doctorId: id }).select("-_id -doctorId");
        return {
            ...user.toObject(),
            Markdown: markdowns,
            DoctorInfo:doctorInfo
        };
    } catch (error) {
        throw new Error(error.message); // Thông báo lỗi nếu có lỗi xảy ra
    }
};
const getDoctorProfileService = async(id)=>{
    try {
        const user = await User.findById(id).select("-password -_id");
        if (!user) {
            throw new Error('User  not found'); // Thông báo lỗi nếu không tìm thấy người dùng
        }
       const doctorinfo = await DoctorInfo.find({doctorId:id}).select("-_id -doctorId")
       return{
        ...user.toObject(),
        DoctorInfo:doctorinfo
       }
    } catch (error) {
        
    }
}

const createMultipleSchedule = async (data) => {
    try {
        // Check for required fields
        if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
            throw new Error('Lỗi: Thiếu thông tin cần thiết');
        }

        // Convert formatedDate to a Date object
        const formattedDate = new Date(data.formatedDate);
        if (isNaN(formattedDate)) {
            throw new Error('Lỗi: Ngày không hợp lệ');
        }

        // Map through the schedule and assign maxNumber and date
        let schedule = data.arrSchedule.map(item => {
            return {
                ...item,
                maxNumber: 10, // Assign maxNumber for each schedule
                date: formattedDate,
                doctorId: data.doctorId,
                name: data.name // Set the name for each schedule
            };
        });

        // Find existing schedules
        let existing = await Schedule.find({
            doctorId: data.doctorId,
            date: formattedDate
        }).lean(); // Use lean() to return plain JavaScript objects

        // Create a Set for existing schedules for quick lookup
        const existingSchedulesSet = new Set(existing.map(item => 
            `${item.timeType}-${item.date.getTime()}` // Ensure date is in timestamp format
        ));

        // Find schedules to create
        let toCreate = schedule.filter(newSchedule => {
            const key = `${newSchedule.timeType}-${formattedDate.getTime()}`;
            return !existingSchedulesSet.has(key);
        });

        // Insert new schedules into the database
        if (toCreate.length > 0) {
            await Schedule.insertMany(toCreate);
        }

        return {
            error: 0,
            message: 'Thêm lịch thành công',
            createdSchedules: toCreate // Optionally return the created schedules
        };
    } catch (error) {
        return {
            error: 1,
            message: error.message
        };
    }
};
const getScheduleServices = async (id,date) => {
    try {
        // Kiểm tra xem doctorId có được cung cấp không
        const user = await User.findById(id).select("-password -_id");
        if (!user) {
            throw new Error('User  not found'); // Thông báo lỗi nếu không tìm thấy người dùng
        }
        const schedules = await Schedule.find({doctorId:id},{date:date}).select("-_id -doctorId")
        return {
            ...user.toObject(),
            Schedule:schedules
        };
    } catch (error) {
        return {
            error: 1,
            message: error.message || 'Đã xảy ra lỗi khi lấy lịch khám',
        };
    }
};
const getExtractDoctorServices = async (doctorId) => {
    try {
        const doctorinfo = await DoctorInfo.findOne({ doctorId: doctorId }).select('-doctorId -_id');
        return doctorinfo; // Trả về thông tin bác sĩ
    } catch (error) {
        throw new Error(error.message); // Ném lỗi để Controller có thể xử lý
    }
};
module.exports={
    getTopDoctorService,getDoctorInforService,createMultipleSchedule, getScheduleServices,getExtractDoctorServices,getDoctorProfileService
}