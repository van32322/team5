const AllCode = require("../models/AllCode")
const {postcreateAllCodeServices,getAllCodeService} = require('../services/allcodeservices')
const postCreateAllCode = async(req,res) =>{
    const {type,key,valueEn,valueVi} = req.body;
    const data = await postcreateAllCodeServices(
        type,
        key,
        valueEn,
        valueVi
    );
    return res.status(200).json(data)
}
const getAllCode = async(req,res) =>{
    const data =await getAllCodeService(req.query.data);
    return res.status(200).json(data);
}
module.exports={postCreateAllCode,getAllCode}