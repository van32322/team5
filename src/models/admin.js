const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const adminSchema = new mongoose.Schema(
{
    nameAdmin:String,
    passwordAdmin:String,
    secretid:String,
},
{
    timestamps:true,
    
}
);
adminSchema.plugin(mongoose_delete,{overrideMethods:'all'})
const Admin=mongoose.model('admin',adminSchema)
module.exports=Admin