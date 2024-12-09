require("dotenv").config()
const AllCode = require("../models/AllCode")
const postcreateAllCodeServices = async(
    type,
    key,
    valueEn,
    valueVi
) =>{
    try {
        let results = await AllCode.create({
            type:type,
            key:key,
            valueEn:valueEn,
            valueVi:valueVi
        })
        return results
    } catch (error) {
        console.log(error);
        return null; 
    }
}
const getAllCodeService = async (typeInput) => {
    try {
        if (!typeInput) {
            return {
                errcode: 1,
                errmessage: "Missing required parameters!"
            };
        } else {
            let res = {};
            let result = await AllCode.find({ type: typeInput });
            res.errcode = 0; // Corrected from let.errcode to res.errcode
            res.data = result;
            return res; // Use return instead of resolve
        }
    } catch (error) {
        console.log(error);
        return {
            errcode: 2,
            errmessage: "An error occurred while fetching the data."
        };
    }
};

module.exports={postcreateAllCodeServices,getAllCodeService}