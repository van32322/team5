const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const scheduleSchema = new mongoose.Schema(
{
  currentNumber: { type: Number },
  maxNumber: { type: Number },
  date: { type: Date },
  timeType: { type: String },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:{type:String}
},
{
    timestamps:true,
    
}
);
scheduleSchema.plugin(mongoose_delete,{overrideMethods:'all'})
const Schedule=mongoose.model('schedule',scheduleSchema)
module.exports=Schedule