import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import React Router
import AuthPage from '../components/AuthPage/AuthPage';
import ResetPasswordPage from '../components/ResetPasswordPage/ResetPasswordPage'; // Import trang reset mật khẩu
import HomePage from '../components/HomePage/HomePage';
import UserHP from '../components/UserHomePage/UserHP'
function App() {
  // const [userRole, setUserRole] = useState(null);  // null - chưa xác định, 'admin' - admin, 'user' - user

  // useEffect(() => {
  //   // Giả sử bạn kiểm tra role từ localStorage hoặc từ API (ví dụ sau khi đăng nhập)
  //   const role = localStorage.getItem('role'); // Ví dụ: role được lưu trong localStorage
  //   setUserRole(role);  // Đặt role là 'admin' hoặc 'user' sau khi xác thực
  // }, []);

  // if (userRole === null) {
  //   return <div>Loading...</div>; // Hoặc có thể redirect đến trang đăng nhập
  // }
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes cho Admin */}
          <Route path="/" element={<UserHP />} /> {/* Trang đăng nhập */}
          <Route path="/AuthPage" element={<AuthPage />} /> {/* Trang đăng nhập */}
          <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* Trang reset mật khẩu */}
          <Route path="/HomePage" element={<HomePage />} />{/* Trang chủ */}
          {/* Routes cho User */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

