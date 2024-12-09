const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const doctor_clinic_specialtySchema = new mongoose.Schema(
{
    doctorId:Number,
    clinicId:Number,
    specialtyId:Number
},
{
    timestamps:true,
    
}
);
doctor_clinic_specialtySchema.plugin(mongoose_delete,{overrideMethods:'all'})
const Doctor_clinic_specialty=mongoose.model('doctor_clinic_specialty',doctor_clinic_specialtySchema)
module.exports=Doctor_clinic_specialty