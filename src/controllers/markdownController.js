const Markdown = require("../models/markdown")
const{createMarkdownService,updateMarkdownServices} = require("../services/markDownService")
const postmarkdown= async(req,res)=>{
    try {
        const inputData = req.body
        let markdown = await createMarkdownService(inputData)
        if (!markdown) {
            return res.status(400).json({
              EC: 1,
              EM: "Người dùng đã tồn tại hoặc thông tin không hợp lệ"
            });
          }
          return res.status(200).json(markdown);
    } catch (error) {
       return res.status(400).json({
        message:error.message
       }) 
    }
}
const updateMarkdown  = async(req,res)=>{
  const {id} = req.params;
  const {doctorId,clinicId,specialtyId,contentHTML,contentMarkdown,description} = req.body;
  const markdown = await updateMarkdownServices(id,doctorId,clinicId,specialtyId,contentHTML,contentMarkdown,description)
  if(markdown){
    return res.status(200).json({
      EC:0,
      data:markdown
    })
  }else{
    return res.status(400).json({
      EC:1,
      message:'markdown not found'
    })
  }
}
module.exports = {
    postmarkdown,updateMarkdown
}