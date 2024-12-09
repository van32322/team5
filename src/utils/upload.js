// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");

// // Create storage engine
// function upload() {
//   const mongodbUrl = process.env.DB_HOST;
//   const storage = new GridFsStorage({
//     url: mongodbUrl,
//     file: (req, file) => {
//       return new Promise((resolve, _reject) => {
//         const fileInfo = {
//           filename: file.originalname,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     },
//   });

//   return multer({ storage });
// }

// module.exports = { upload };
// app.use(express.static('public'))