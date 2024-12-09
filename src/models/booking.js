const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const bookingSchema = new mongoose.Schema(
{
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date },
  timeType: { type: String },
  statusId: { type: String,enum:['New','Confirmed','Done','Cancel'] },
  token:{type:String}
},
{
    timestamps:true,
    
}
);
bookingSchema.plugin(mongoose_delete,{overrideMethods:'all'})
const Booking=mongoose.model('booking',bookingSchema)
module.exports=Booking