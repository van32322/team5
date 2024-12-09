const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const UserSchema = new mongoose.Schema(
  { 
    name:{ type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    gender: { 
      type: String, // Kiểu String cho gender
      enum: ['Male', 'Fale', 'Other'] // Các giá trị hợp lệ cho gender
    },
    roleid: { type: String, enum: ['R1', 'R2', 'R3'] },
    phoneNumber: { type: String },
    positionId: { 
      type: String, // Kiểu String cho position
      enum: ['Patient', 'Doctor', 'Professor'] // Các giá trị hợp lệ cho position
    },
    image: { type: String }
  },
  {
    timestamps: true,
  }
);

// Thao tác với db thông qua model
UserSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("User", UserSchema); // Đảm bảo tên mô hình là 'User' với chữ cái hoa
module.exports = User;