import { useState, useEffect, useRef } from 'react';

import styles from './OTPInput.module.css'; // Create a CSS module for styling

const OTPInput = ({ length = 6, onOtpSubmit = () => { } }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);
    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        const combineOtp = newOtp.join("");
        if (combineOtp.length === length) onOtpSubmit(combineOtp);
        if (value && index < length - 1 && inputRefs.current[index + 1]) {

            inputRefs.current[index + 1].focus();
        }
    };
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

    }
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    }
    const inputRefs = useRef([]);
    return <div>
        {
            otp.map((value, index) => {
                return (
                    <input
                        key={index}
                        type="text"
                        ref={(input) => (inputRefs.current[index] = input)}
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={styles.otpInput}
                    />
                );
            })
        }
    </div>
};
export default OTPInput;
