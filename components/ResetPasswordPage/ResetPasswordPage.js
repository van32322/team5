import React, { useState } from 'react';
import './ResetPasswordPage.css';
import hospitalImage from '../../assets/images/hospital.png';

function ResetPasswordPage() {
    const [step, setStep] = useState(1);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const togglePassword = (id) => {
        const passwordInput = document.getElementById(id);
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    };

    const handleNextStep = () => {
        if (step === 1) {
            // Kiểm tra email hoặc số điện thoại
            if (!emailOrPhone) {
                setError('Vui lòng nhập email hoặc số điện thoại!');
                return;
            }
            setError('');
        } else if (step === 2) {
            // Kiểm tra mã OTP
            if (!code) {
                setError('Vui lòng nhập mã OTP!');
                return;
            }
            setError('');
        } else if (step === 3) {
            // Kiểm tra mật khẩu mới (nếu cần)
            if (!newPassword) {
                setError('Vui lòng nhập mật khẩu mới!');
                return;
            }
            setError('');
        }

        setStep(step + 1);
    };

    return (
        <div className="container">
            <img src={hospitalImage} alt="Hospital" className="hospital-image" />

            <div className="form-container">
                <img src="https://inhoangkien.vn/wp-content/uploads/2020/04/Logo-B%E1%BB%99-Y-t%E1%BA%BF-01-e1585994422207-300x213.png"
                    alt="Logo" className="logo"
                />

                {error && <div className="error-message">{error}</div>}
                <form className="form">

                    {step === 1 && (
                        <>
                            <label htmlFor="getpass" >Lấy lại mật khẩu</label>
                            <div className="input-box">

                                <input type="text" placeholder="Nhập email hoặc số điện thoại"
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                />

                            </div>
                            <div className="button" onClick={handleNextStep}>Confirm</div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <label htmlFor="OTP">Nhập mã OTP</label>
                            <p>
                                Chúng tôi đã gửi mã OTP đến email của bạn (hoặc SMS nếu bạn đã nhập số điện thoại).
                            </p>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Nhập mã OTP"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            <div className="button" onClick={handleNextStep}>Confirm</div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <label htmlFor="password">New password:</label>
                            <div className="input-box">
                                <input type="password" id="password1" placeholder="Nhập mât khẩu" />
                                <span className="password-toggle" onClick={() => togglePassword('password1')}>👁️</span>
                            </div>
                            <label htmlFor="newpass">Confrim password</label>
                            <div className="input-box">
                                <input
                                    type="password"
                                    id="password2"
                                    placeholder="Nhập lại password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span className="password-toggle" onClick={() => togglePassword('password2')}>👁️</span>
                            </div>
                            <div className="button" onClick={handleNextStep}>Confirm</div>
                        </>
                    )}

                    {step === 4 && (
                        <div>
                            <div className="d"> Đã lấy lại mật khẩu</div>
                            <p>
                                Bạn muốn quay lại trang <a href="/AuthPage">Trang đăng nhập</a>
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
