require("dotenv").config();
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generalAccessToken, generalrefreshToken } = require("./jwt");
const saltRounds = 10;

const createAdminService = async (nameAdmin, passwordAdmin, secretid) => {
    try {
        const hashPassword = await bcrypt.hash(passwordAdmin, saltRounds);
        const hashSecretId = await bcrypt.hash(secretid, saltRounds);
        
        let result = await Admin.create({
            nameAdmin: nameAdmin,
            passwordAdmin: hashPassword,
            secretid: hashSecretId
        });
        
        return {
            EC: 0,
            EM: "Admin created successfully",
            data: result
        };
    } catch (error) {
        console.error("Error creating admin:", error);
        return {
            EC: 99,
            EM: "Error creating admin"
        };
    }
};

const loginAdminService = async (nameAdmin, passwordAdmin, secretid) => {
    try {
        const admin = await Admin.findOne({ nameAdmin: nameAdmin });
        
        if (admin) {
            // So sánh mật khẩu
            const isMatchPassword = await bcrypt.compare(passwordAdmin, admin.passwordAdmin);
            const isMatchSecretId = await bcrypt.compare(secretid, admin.secretid);
            
            if (!isMatchPassword || !isMatchSecretId) {
                return {
                    EC: 2,
                    EM: "EMAIL/PASSWORD không hợp lệ",
                };
            } else {
                const payload = {
                    nameAdmin: admin.nameAdmin,
                };
                
                // Nếu email và mật khẩu đúng
                const access_token = await generalAccessToken(payload);
                const refresh_token = await generalrefreshToken(payload);
                
                return {
                    EC: 0,
                    access_token,
                    refresh_token,
                    admin: {
                        nameAdmin: admin.nameAdmin,
                        passwordAdmin:admin.passwordAdmin,
                        secretid:admin.passwordAdmin
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

module.exports = {
    createAdminService,
    loginAdminService
};