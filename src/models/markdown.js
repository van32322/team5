const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const MarkdownSchema = new mongoose.Schema(
{
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true }, // Liên kết với model User
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: false }, // Liên kết với model Clinic
    specialtyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: false }, // Liên kết với model Specialty
    contentHTML: { type: String, required: true },
    contentMarkdown: { type: String, required: true },
    description: { type: String, required: true }
},
{
    timestamps:true,
    
}
);
MarkdownSchema.plugin(mongoose_delete,{overrideMethods:'all'})
const Markdown=mongoose.model('Markdown',MarkdownSchema)
module.exports=Markdown