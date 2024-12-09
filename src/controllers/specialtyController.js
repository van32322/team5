const Specialty = require('../models/specialty');
const{specialtyService,getAllSpecialtyService,getdetailspecialtyService} = require('../services/specialtyService')
const{uploadSingleFile}=require('../services/userService')
const createSpecialty =async (req,res)=>{
    try {
        const {name,descriptionHTML,descriptionMarkdown}= req.body
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
          const data={
            name,
            image:imageUrl,
            descriptionHTML,
            descriptionMarkdown
          }
          let specialty = await specialtyService(data)
          if(!specialty){
            return res.status(400).json({
                EC:1,
                EM:"Thông tin không hợp lệ"
            })
          }
          return res.status(200).json({
            EC:0,
            data:specialty
          })
    } catch (error) {
        console.log(error)
        return{
            error:3,
            message:error.message
        }
    }
}
const getAllSpecialty = async(req,res)=>{
  try {
    const specialty = await getAllSpecialtyService()
    return res.status(200).json(specialty)
  } catch (error) {
     console.log(error)
     return{
      error:1,
      message:error.message
     }
  }
}
const getdetailspecialtyByid = async(req,res)=>{
  try {
    const infor = await getdetailspecialtyService(req.query.id,req.query.location)
    return res.status(200).json(infor)
  } catch (error) {
     console.log(error)
     return{
      error:1,
      message:error.message
     }
  }
}
module.exports ={
    createSpecialty,getAllSpecialty,getdetailspecialtyByid
}