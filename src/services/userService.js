require("dotenv").config;
const User = require("../models/user");
const path = require("path")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generalAccessToken, generalrefreshToken } = require("./jwt");
const saltRounds = 10;
const createUserService = async (data) => {
  try {
    const { email, password, name, gender, roleid, phoneNumber,positionId, image } = data;

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log(`>> Địa chỉ email không hợp lệ: ${email}`);
      return null;
    }

    // Kiểm tra người dùng đã tồn tại
    const user = await User.findOne({ email });
    if (user) {
      console.log(`>> Người dùng đã tồn tại, chọn một email khác: ${email}`);
      return null;
    }

    // Mã hóa mật khẩu
    const hashPassword = await bcrypt.hash(password, saltRounds);
    
    // Tạo người dùng mới
    let result = await User.create({
      name,
      email,
      password: hashPassword,
      gender,
      roleid,
      phoneNumber,
      positionId,
      image
    });
    
    return result;
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "LỖI ĐĂNG KÍ VUI LÒNG KIỂM TRA LẠI THÔNG TIN"
    };
  }
};
const loginService = async (email1, password) => {
  try {
    // Tìm kiếm người dùng theo email
    const user = await User.findOne({ email: email1 });

    if (user) {
      // So sánh mật khẩu
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "EMAIL/PASSWORD không hợp lệ",
        };
      }else{
          const payload = {
              id: user._id,
              email: user.email,
            };
          // Nếu email và mật khẩu đúng
          const access_token =await generalAccessToken(payload);
          return {
            EC: 0,
            access_token,
            user: {
              id: user._id,
              email: user.email,
            },
          };
      }
    } else {
      return {
        EC: 1,
        EM: "EMAIL/PASSWORD không hợp lệ",
      };
    }
  } catch (error) {
    console.error("Lỗi trong quá trình đăng nhập:", error);
    return {
      EC: 99,
      EM: "Lỗi không xác định",
    };
  }
};
const getUserService = async () =>{
  try {
    let result=await User.find({}).select("-password");
    return result;
  } catch (error) {
      console.log(error);
      return null;
  }
};
const updateUserservices = async (id, name, email, password, gender, roleid,phoneNumber,positionId) => {
  try {
      // Use the provided id to find the user document to update
      const results = await User.updateOne(
          { _id: id }, // Find the user by ID
          { name, email, password, gender, roleid, phoneNumber,positionId } // Fields to update
      );

      // Check if any document was modified
      if (results.nModified === 0) {
          return null; // No user was updated (user not found or no changes made)
      }

      return results; // Return the results of the update operation
  } catch (error) {
      console.log(error); // Log any errors
      return null; // Return null in case of an error
  }
};
const deleteUserServices = async(id) =>{
  try {
    const results= await User.deleteOne(id)
    return results
  } catch (error) {
    console.log(error);
    return null
  }
}
const refreshTokenService = async (refreshToken) => {
  try {
    // Xác minh tính hợp lệ của refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    if (!decoded) {
      return {
        EC: 1,
        EM: "Refresh Token không hợp lệ",
      };
    }

    // Tạo Access Token mới
    const newAccessToken = await generalAccessToken({
      email: decoded.email,
      name: decoded.name,
    });

    return {
      EC: 0,
      EM: "Tạo Access Token thành công",
      access_token: newAccessToken,
    };
  } catch (error) {
    console.error("Lỗi trong quá trình làm mới token:", error);

    // Xử lý lỗi khi token hết hạn hoặc không hợp lệ
    if (error.name === "TokenExpiredError") {
      return {
        EC: 2,
        EM: "Refresh Token đã hết hạn",
      };
    }
    return {
      EC: 99,
      EM: "Lỗi không xác định",
    };
  }
};
const uploadSingleFile = async(fileObject)=>{
  const uploadPath = path.resolve(__dirname,"../public/images/upload_doctor")
  const extName = path.extname(fileObject.name);
  const baseName = path.basename(fileObject.name, extName);
  const finalName = `${baseName}-${Date.now()}${extName}`;
  const finalPath = path.join(uploadPath, finalName);
  try {
    await fileObject.mv(finalPath);
    return{
      status:'success',
      path:finalName,
      error:null
    }
  } catch (error) {
    console.log(">>>check error: ",error)
    return{
      status:'failed',
      path:null,
      error:JSON.stringify(error)
    }
  }
}


module.exports = {
  createUserService,
  loginService,
  getUserService,
  updateUserservices,
  deleteUserServices,
  refreshTokenService,
  uploadSingleFile,
};
