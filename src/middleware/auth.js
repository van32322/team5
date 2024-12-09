// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const auth = (req, res, next) => {
//   // Danh sách các route không cần token (login, register)
//   const whiteListRegex = /^\/v1\/api\/(login|register|refresh-token)$/;
//   if (whiteListRegex.test(req.originalUrl)) {
//     return next();
//   }

//   // Kiểm tra header Authorization
//   if (req.headers && req.headers.authorization) {
//     const token = req.headers.authorization.split(' ')[1]; // Lấy token từ header
//     if (!token) {
//       return res.status(401).json({
//         message: 'Bạn chưa truyền AccessToken.',
//       });
//     }

//     try {
//       // Xác thực token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log('Check token:', decoded);
//       req.user = decoded; // Gắn thông tin user vào request
//       next();
//     } catch (error) {
//       return res.status(401).json({
//         message: 'Token không hợp lệ hoặc đã hết hạn.',
//       });
//     }
//   } else {
//     // Trường hợp không có Authorization header
//     return res.status(401).json({
//       message: 'Bạn chưa truyền AccessToken hoặc token đã hết hạn.',
//     });
//   }
// };

// module.exports = auth;
