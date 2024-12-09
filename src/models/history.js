const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const historySchema = new mongoose.Schema(
{
    description: { type: String },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date },
    timeType: { type: String },
    files: [{ type: String }],
},
{
    timestamps:true,
    
}
);
historySchema.plugin(mongoose_delete,{overrideMethods:'all'})
const History=mongoose.model('history',historySchema)
module.exports=History