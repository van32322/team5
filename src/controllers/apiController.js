const User = require("../models/user");
const { createUserService, loginService, getUserService,updateUserservices, deleteUserServices,refreshTokenService,uploadSingleFile} = require("../services/userService");
const getUserAPI = async (req, res) => {
  const data =await getUserService();
  return res.status(200).json(data);
};
const postCreateUserAPI = async (req, res) => {
  //thêm người dùng lấy dữ liệu tham số truyền vào database
  const { name, email, password, gender, roleid, phoneNumber,positionId } = req.body;
  let imageUrl = ""; // Khai báo biến imageUrl
  
  // Kiểm tra xem có file nào được upload không
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No file was uploaded');
  } else {
    const result = await uploadSingleFile(req.files.image);
    if (result.status === 'success') {
      imageUrl = result.path; // Lưu đường dẫn ảnh
    } else {
      return res.status(500).json({
        EC: 1,
        EM: "Lỗi khi upload ảnh: " + result.error
      });
    }
  }
  const data ={
    name,
    email,
    password,
    gender,
    roleid,
    phoneNumber,
    positionId,
    image: imageUrl
  }
  let user = await createUserService(data);
  
  if (!user) {
    return res.status(400).json({
      EC: 1,
      EM: "Người dùng đã tồn tại hoặc thông tin không hợp lệ"
    });
  }
  return res.status(200).json({
    EC: 0,
    data: user
  });
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);
  return res.status(200).json(data);
};
const putUpdateUserAPI = async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters
  const { name, email, password, gender, roleid, phoneNumber,positionId } = req.body;

  // Call the update service
  const user = await updateUserservices(id, name, email, password, gender, roleid, phoneNumber,positionId);

  // Check if the user was updated successfully
  if (user) {
      return res.status(200).json({
          EC: 0,
          data: user
      });
  } else {
      return res.status(404).json({
          EC: 1,
          message: 'User  not found or update failed'
      });
  }
};
const deleteUserAPI = async (req, res) => {
  const id = req.body.Id;
  const results = await deleteUserServices(id)
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};
const refreshToken = async (req, res) => {
  try {
    // Lấy token từ header
    const token = req.headers.token?.split(' ')[1]; // Đảm bảo token tồn tại và lấy phần token sau "Bearer"
    if (!token) {
      return res.status(400).json({
        status: "err",
        message: "Token là bắt buộc",
      });
    }

    // Gọi service để xử lý
    const response = await refreshTokenService(token);

    if (response.EC === 0) {
      return res.status(200).json({
        status: "success",
        message: response.EM,
        access_token: response.access_token,
      });
    } else {
      return res.status(400).json({
        status: "err",
        message: response.EM,
      });
    }
  } catch (error) {
    console.error("Lỗi trong refreshToken controller:", error);
    return res.status(500).json({
      status: "err",
      message: "Lỗi server",
    });
  }
};
const logoutUserAPI = async (req, res) => {
  try {
    // Xóa refresh token khỏi cookie
    res.clearCookie('refresh_token'); // Nếu bạn đang lưu refresh token trong cookie

    // Nếu bạn lưu token trong local storage hoặc session storage, bạn có thể chỉ cần trả về thông báo thành công
    return res.status(200).json({
      status: 'success',
      message: 'Logout successfully',
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error during logout',
    });
  }
};
const postUploadSingleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No file was uploaded');
  }

  const result = await uploadSingleFile(req.files.image);
  console.log(">>check result: ", result);

  if (result.status === 'success') {
    return res.status(200).json({
      message: 'File uploaded successfully',
      filePath: result.path // Trả về đường dẫn file đã upload
    });
  } else {
    return res.status(500).json({
      message: 'File upload failed',
      error: result.error
    });
  }
};
const getAllPatients = async(req,res) =>{
  try {
    const patients = await User.find({roleid:'R1'})
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
};
const getAllDoctors = async(req,res)=>{
  try {
    const doctors = await User.find({roleid:'R2'})
    return res.status(200).json(doctors)
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}
const getAllProfessors = async(req,res)=>{
  try {
    const professors = await User.find({roleid:'R3'})
    return res.status(200).json(professors)
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

module.exports = {
  getUserAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  handleLogin,
  refreshToken,
  logoutUserAPI,
  postUploadSingleFile,
  getAllPatients,
  getAllDoctors,
  getAllProfessors,
};
