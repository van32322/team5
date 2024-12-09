const Markdown = require("../models/markdown")
const DoctorInfo = require("../models/doctorinfo");

const createMarkdownService = async (inputData) => {
    try {
        // Kiểm tra dữ liệu đầu vào
        let checkObj = checkRequiredFileds(inputData);
        if (checkObj.isvalid === false) {
            return {
                error: 1,
                message: `Thiếu thông tin cần thiết: ${checkObj.element}`
            };
        }

        // Xử lý hành động CREATE hoặc EDIT
        if (inputData.action === 'CREATE') {
            // Tạo mới Markdown
            await Markdown.create({
                contentHTML: inputData.contentHTML,
                contentMarkdown: inputData.contentMarkdown,
                description: inputData.description,
                doctorId: inputData.doctorId
            });
        } else if (inputData.action === 'EDIT') {
            // Cập nhật Markdown
            let doctorMarkdown = await Markdown.findOne({ doctorId: inputData.doctorId });
            if (doctorMarkdown) {
                doctorMarkdown.contentHTML = inputData.contentHTML;
                doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                doctorMarkdown.description = inputData.description;
                await doctorMarkdown.save();
            } else {
                return {
                    error: 1,
                    message: "Không tìm thấy thông tin Markdown để cập nhật."
                };
            }
        } else {
            return {
                error: 1,
                message: "Hành động không hợp lệ."
            };
        }

        // Tìm thông tin bác sĩ
        let doctorInfo = await DoctorInfo.findOne({ doctorId: inputData.doctorId });
        if (doctorInfo) {
            // Cập nhật thông tin bác sĩ
            doctorInfo.specialtyId = inputData.specialtyId;
            doctorInfo.clinicId = inputData.clinicId;
            doctorInfo.priceId = inputData.selectedPrice;
            doctorInfo.provinceId = inputData.selectedProvince;
            doctorInfo.paymentId = inputData.selectedPayment;
            doctorInfo.nameClinic = inputData.nameClinic;
            doctorInfo.addressClinic = inputData.addressClinic; // Cập nhật địa chỉ phòng khám
            doctorInfo.note = inputData.note;
            await doctorInfo.save();
        } else {
            // Tạo mới thông tin bác sĩ
            await DoctorInfo.create({
                doctorId: inputData.doctorId,
                specialtyId: inputData.specialtyId,
                clinicId: inputData.clinicId,
                priceId: inputData.selectedPrice,
                provinceId: inputData.selectedProvince,
                paymentId: inputData.selectedPayment,
                nameClinic: inputData.nameClinic,
                addressClinic: inputData.addressClinic, // Thêm địa chỉ phòng khám
                note: inputData.note
            });
        }

        return {
            error: 0,
            message: 'Tạo thông tin bác sĩ thành công!'
        };
    } catch (error) {
        console.error(error);
        return {
            error: 1,
            message: `Đã xảy ra lỗi: ${error.message}`
        };
    }
};
const updateMarkdownServices=async(doctorId,clinicId,specialtyId,contentHTML,contentMarkdown,description)=>{
    try {
        const results = await Markdown.updateOne({_id:id},
            {doctorId,clinicId,specialtyId,contentHTML,contentMarkdown,description}
        )
        return results
    } catch (error) {
        console.log(error);
        return null
    }
}
const checkRequiredFileds = (inputData) => {
    const requiredFields = [
        'doctorId',
        'contentHTML',
        'contentMarkdown',
        'action',
        'selectedPrice',
        'selectedProvince',
        'selectedPayment',
        'nameClinic',
        'addressClinic',
        'note',
        'specialtyId',
        'clinicId'
    ];

    let isvalid = true;
    let element = '';

    for (let i = 0; i < requiredFields.length; i++) {
        if (!inputData[requiredFields[i]]) {
            isvalid = false;
            element = requiredFields[i];
            break;
        }
    }

    return {
        isvalid: isvalid,
        element: element
    };
};
module.exports = {
    createMarkdownService,updateMarkdownServices
}