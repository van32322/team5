const { error } = require("console");
const Specialty = require("../models/specialty")
const path = require("path");
const DoctorInfo = require("../models/doctorinfo");
const specialtyService = async(data)=>{
    try {
        if(!data.name || !data.image ||!data.descriptionHTML || !data.descriptionMarkdown){
            return{
                error:1,
                message:error.message
            }   
        }else{
            const{name,image,descriptionHTML,descriptionMarkdown}=data;
            
           const result= await Specialty.create({
                name,
                image,
                descriptionHTML,
                descriptionMarkdown
            })
            return result
        }
    } catch (error) {
       console.log(error) 
       return{
        EC:1,
        EM:'Vui lòng kiểm tra lại thông tin'
       }
    }
}
const getAllSpecialtyService = async()=>{
    try {
        let specialty = await Specialty.find({})
        return specialty
    } catch (error) {
        console.log(error)
        return null
    }
}
const getdetailspecialtyService = async (inputId, location) => {
    try {
        // Kiểm tra đầu vào
        if (!inputId || !location) {
            return {
                error: 1,
                message: "Input ID and location are required."
            };
        }

        // Tìm kiếm specialty theo inputId
        let data = await Specialty.findOne({ id: inputId }).select("-name -image -_id");
        
        // Nếu không tìm thấy specialty
        if (!data) {
            return {
                error: 1,
                message: "Specialty not found."
            };
        }

        // Khởi tạo mảng doctorSpecialty
        let doctorSpecialty = [];

        // Tìm kiếm bác sĩ theo specialtyId và location
        if (location === 'ALL') {
            doctorSpecialty = await DoctorInfo.find({ specialtyId: inputId }).select('doctorId provinceId');
        } else {
            doctorSpecialty = await DoctorInfo.find({ specialtyId: inputId, provinceId: location }).select('doctorId provinceId -_id');
        }
        
        // Gán doctorSpecialty vào data
        data.doctorSpecialty = doctorSpecialty;

        // Trả về kết quả
        return {
           ...data.toObject(),
           DoctorInfo:doctorSpecialty
        };
    } catch (error) {
        console.error(error);
        return {
            error: 1,
            message: "An error occurred while fetching data."
        };
    }
};
module.exports={
    specialtyService,getAllSpecialtyService,getdetailspecialtyService
}