const Clinic = require("../models/clinic")
const{uploadSingleFile}=require('../services/userService')
const{createClinicService,getAllClinicServices} = require('../services/clinicService')
const createClinic = async(req,res)=>{
    try {
        const {name,address,descriptionHTML,descriptionMarkdown}= req.body
        let imageUrl = "";
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No file was uploaded');
          } else {
            const result = await uploadSingleFile(req.files.image);
            if (result.status === 'success') {
              imageUrl = result.path; // Lưu đường dẫn ảnh
            } else {
              return res.status(500).json({
                EC: 1,
                EM: "Lỗi khi upload ảnh: " + result.error
              });
            }
          }
          const data = {
            name,
            address,
            descriptionHTML,
            descriptionMarkdown,
            image:imageUrl
          }
          const clinic = await createClinicService(data)
          if(!clinic){
            return res.status(400).json({
                EC:1,
                EM:"Thông tin không hợp lệ"
            })
          }
          return res.status(200).json({
            EC:0,
            data:clinic
          })
    } catch (error) {
        console.log(error)
        return{
            error:3,
            message:error.message
        }
        
    }
}
const getAllClinic = async(req,res)=>{
    try {
      const infor = await getAllClinicServices()
      return res.status(200).json({infor})
    } catch (error) {
      console.log(error)
      return{
        error:3,
        message:error.message
      }
    }
}
module.exports = {
    createClinic,getAllClinic
}