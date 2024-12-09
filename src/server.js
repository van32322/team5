const express = require("express");
const path = require("path");
require("dotenv").config();
const configViewEngine = require("./config/viewEngine");
const crypto = require("crypto");
const { GridFsStorage } = require("multer-gridfs-storage");
const apiroutes = require("./routes/api.js");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const connection = require("./config/Database.js");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const logger = require("morgan");
const fileUpload = require("express-fileupload")
const fs = require("fs");
 const Avatar = require("./models/uploadAvatar.js");  // Đảm bảo dùng đúng tên model

// Cấu hình middleware
app.use(fileUpload())
app.use(cors());
app.use(express.static('public'))
const uploadDir = path.join(__dirname, "public/image");

// Tạo thư mục nếu chưa tồn tại
//  if (!fs.existsSync(uploadDir)) {
//    fs.mkdirSync(uploadDir, { recursive: true });
//  }

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Lưu tệp vào thư mục public/images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname.replace(/\s+/g, '_'); // Thay thế khoảng trắng bằng dấu gạch dưới
    cb(null, `file_${uniqueSuffix}`);
  },
});

// Khởi tạo multer với cấu hình lưu trữ
const upload = multer({ storage });

// Sử dụng express.static để phục vụ tệp tĩnh từ thư mục 'public'
app.use(express.static('public'));

// Route để tải lên tệp
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file nào được tải lên.' });
    }

    // Lưu thông tin tệp vào MongoDB
    const newAvatar = await Avatar.create({ image: req.file.filename });
    
    res.json({
      message: 'Upload thành công',
      data: newAvatar, // Trả về đối tượng chứa tên tệp
    });
  } catch (err) {
    console.error('Lỗi khi upload file:', err);
    res.status(500).json({ message: 'Lỗi khi upload file', error: err.message });
  }
});
// Route để lấy ảnh
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const fileLocation = path.join(uploadDir, filename);

  res.sendFile(fileLocation, (err) => {
    if (err) {
      console.error('Lỗi khi lấy file:', err);
      res.status(404).json({ message: 'File không tìm thấy' });
    }
  });
});
// Config template engine
configViewEngine(app);

// Config body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
// Route cho các API và views khác
app.use("/v1/api", apiroutes);
app.use(bodyParser.json());
app.use(methodOverride("_method"));


// Kiểm tra kết nối DB
const startServer = async () => {
  try {
    await connection();
    const url = process.env.DB_HOST;
    const dbName = process.env.DB_NAME;
    console.log("connected successfully to server");
    app.listen(port, hostname, () => {
      console.log(`App listening at http://${hostname}:${port}`);
    });
  } catch (error) {
    console.log("Error connecting to DB:", error);
  }
};
mongoose.set('strictQuery', true);

startServer();
