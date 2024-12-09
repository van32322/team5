const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const clinicSchema = new mongoose.Schema(
{
    name:String,
    address:String,
    descriptionMarkdown:String,
    descriptionHTML:String,
    image:String
},
{
    timestamps:true,
    
}
);
clinicSchema.plugin(mongoose_delete,{overrideMethods:'all'})
const Clinic=mongoose.model('clinic',clinicSchema)
module.exports=Clinic