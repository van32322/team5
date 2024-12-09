const { required } = require('joi');
const mongoose = require('mongoose');

const doctorInfoSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    specialtyId:{ type: mongoose.Schema.Types.ObjectId,ref:'Specialty',required:true },
    clinicId:{ type: mongoose.Schema.Types.ObjectId,ref:'Clinic',required:true },
    priceId: { type: String },
    provinceId: { type: String },
    paymentId: { type: String,enum:['Cash','Credit card','All payment method'] },
    addressClinic: { type: String },
    nameClinic: { type: String },
    note: { type: String },
    count: { type: Number, default: 0 },
});

const DoctorInfo = mongoose.model('DoctorInfo', doctorInfoSchema);
module.exports = DoctorInfo;
