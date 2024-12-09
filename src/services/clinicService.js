const path = require('path')
const Clinic = require('../models/clinic')
const createClinicService =async (data)=>{
     try {
        if(!data.name || !data.address ||!data.descriptionMarkdown || !data.descriptionHTML || !data.image){
            return{
                error:1,
                message:error.message
            }
        }else{
           const{name,address,descriptionHTML,descriptionMarkdown,image}=data;
           const result= await Clinic.create({
                name,
                address,
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
module.exports ={
    createClinicService
}