const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Vui lòng chọn một file để upload!' });
    }

    // Lấy đường dẫn file đã upload
    const imagePath = `/uploads/${req.file.filename}`;

    res.status(200).json({
        message: 'Upload ảnh thành công!',
        imagePath
    });
};

module.exports = { uploadImage };