const Admin =require("../models/admin")
const {createAdminService,loginAdminService}=require("../services/adminService")
const postCreateAdmin = async(req,res) =>{
    const{nameAdmin,passwordAdmin,secretid} = req.body
    const data = await createAdminService(
        nameAdmin,
        passwordAdmin,
        secretid
    );
    return res.status(200).json(data)
}
const handleLoginAdmin = async (req, res) => {
    const { nameAdmin,passwordAdmin,secretid } = req.body;
    const data = await loginAdminService(nameAdmin,passwordAdmin,secretid);
    return res.status(200).json(data);
  };
  module.exports= {
    postCreateAdmin,handleLoginAdmin
  }