import React, { useState, useEffect } from 'react';
import style from "./UserHP.module.css"
import Header from "./Header"
const UserProfiles = () => {
    const [profiles, setProfiles] = useState([]); // Danh sách hồ sơ
    const [selectedProfile, setSelectedProfile] = useState(null); // Hồ sơ được chọn
    const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
    const [editForm, setEditForm] = useState({});
    const [newProfile, setNewProfile] = useState({
        name: '',
        phone: '',
        dob: '',
        gender: '',
        relation: [],
    });
    const [isAddingProfile, setIsAddingProfile] = useState(false);
    // Dữ liệu giả lập
    const mockData = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            binCode: "BIN001",
            phone: "0123456789",
            dob: "01/01/1990",
            gender: "Nam",
            address: "Hà Nội, Việt Nam",
            healthInsuranceCode: "BHYT123456",
            idCard: "CCCD123456",
            ethnicity: "Kinh",
            job: "Kỹ sư phần mềm",
            email: "nguyenvana@example.com",
        },
        {
            id: 2,
            name: "Trần Thị B",
            binCode: "BIN002",
            phone: "0987654321",
            dob: "15/05/1985",
            gender: "Nữ",
            address: "TP. Hồ Chí Minh, Việt Nam",
            healthInsuranceCode: "BHYT654321",
            idCard: "CMND987654",
            ethnicity: "Kinh",
            job: "Nhân viên văn phòng",
            email: "tranthib@example.com",
        },
    ];

    useEffect(() => {
        // Gọi API lấy danh sách hồ sơ
        fetchProfiles();
    }, []);
    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        setNewProfile((prevProfile) => {
            const updatedRelation = prevProfile.relation.includes(value)
                ? prevProfile.relation.filter((relation) => relation !== value)
                : [...prevProfile.relation, value];
            return { ...prevProfile, relation: updatedRelation };
        });
    };
    const handleAddProfileForm = () => {
        setIsAddingProfile(true); // Bắt đầu thêm hồ sơ
        setNewProfile({
            name: '',
            phone: '',
            dob: '',
            gender: '',
            relation: [],
        });
    };
    const fetchProfiles = async () => {
        try {
            const response = await fetch('https://api.example.com/profiles');
            if (!response.ok) throw new Error('Không thể lấy danh sách hồ sơ.');
            const data = await response.json();
            setProfiles(data);
            setSelectedProfile(data[0] || null); // Chọn hồ sơ đầu tiên nếu có
        } catch (err) {
            console.warn('API không khả dụng, sử dụng mock data.');
            setProfiles(mockData);
            setSelectedProfile(mockData[0] || null);
        }
    };
    const handleStartEdit = () => {
        setIsEditing(true);
        setEditForm({ ...selectedProfile }); // Sao chép dữ liệu vào form
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditForm({});
    };
    const handleSaveEdit = async () => {
        try {
            // Gửi dữ liệu chỉnh sửa đến API
            const response = await fetch(`https://api.example.com/profiles/${editForm.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
            });

            // Nếu phản hồi không thành công, ném lỗi và dừng quá trình
            if (!response.ok) throw new Error("Không thể chỉnh sửa hồ sơ. API không phản hồi thành công.");

            // Cập nhật dữ liệu sau khi API phản hồi thành công
            const updatedProfiles = profiles.map((profile) =>
                profile.id === editForm.id ? editForm : profile
            );
            setProfiles(updatedProfiles);
            setSelectedProfile(editForm);
            setIsEditing(false);

            alert("Chỉnh sửa hồ sơ thành công!"); // Thông báo thành công
        } catch (err) {
            console.error("Lỗi khi chỉnh sửa hồ sơ:", err.message);

            // Thông báo lỗi nếu API không gửi được
            alert("Không thể chỉnh sửa hồ sơ. Vui lòng kiểm tra lại kết nối hoặc thử lại sau.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isAddingProfile) {
            setNewProfile((prev) => ({ ...prev, [name]: value }));
        } else if (isEditing) {
            setEditForm((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleSaveAddProfile = async () => {
        const { name, phone, dob, gender, relation } = newProfile;

        // Kiểm tra các trường thông tin có đầy đủ không
        if (!name || !phone || !dob || !gender || relation.length === 0) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            // Gửi API thêm hồ sơ
            const response = await fetch('https://api.example.com/profiles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProfile),
            });

            // Kiểm tra nếu API không thành công
            if (!response.ok) {
                throw new Error('Không thể thêm hồ sơ.');
            }

            // Lấy dữ liệu từ API phản hồi
            const createdProfile = await response.json();

            // Cập nhật danh sách hồ sơ và đóng form
            setProfiles([...profiles, createdProfile]);
            setIsAddingProfile(false);

            alert('Thêm hồ sơ thành công!');
        } catch (err) {
            // Thông báo lỗi nếu API thất bại
            console.error('Lỗi khi thêm hồ sơ:', err.message);
            alert('Không thể thêm hồ sơ. Vui lòng thử lại.');
        }
    };
    const handleCancelAddProfile = () => {
        setIsAddingProfile(false); // Hủy bỏ thêm hồ sơ
    };
    const handleDeleteProfile = async (id) => {
        try {
            const response = await fetch(`https://api.example.com/profiles/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Không thể xóa hồ sơ.');

            const updatedProfiles = profiles.filter((profile) => profile.id !== id);
            setProfiles(updatedProfiles);
            setSelectedProfile(updatedProfiles.length > 0 ? updatedProfiles[0] : null);
            alert('Xóa hồ sơ thành công!');
        } catch (err) {
            console.error('Lỗi khi xóa hồ sơ:', err.message);
            alert('Không thể xóa hồ sơ, vui lòng thử lại.');
        }
    };
    return (
        <div className={style.UserHPContainer}>
            <Header></Header>
            <div style={styles.container}>
                {/* Sidebar danh sách hồ sơ */}
                <div style={styles.sidebar}>
                    <h3>Danh sách hồ sơ</h3>
                    {profiles.map((profile, index) => (
                        <div
                            key={profile.id}
                            style={{
                                ...styles.profileItem,
                                backgroundColor: selectedProfile?.id === profile.id ? '#007BFF' : '#f0f0f0',
                                color: selectedProfile?.id === profile.id ? '#fff' : '#000',
                            }}
                            onClick={() => {
                                if (!isEditing) {
                                    setSelectedProfile(profile);
                                }
                            }}
                        >
                            Hồ sơ {index + 1}
                        </div>
                    ))}
                    {/* Nút thêm hồ sơ */}
                    <button style={styles.addButton} onClick={() => handleAddProfileForm()}>
                        Thêm hồ sơ
                    </button>
                </div>

                {/* Thông tin chi tiết hồ sơ */}
                <div style={styles.detailsContainer}>
                    {isAddingProfile ? (
                        <>
                            <div style={styles.formContainer}>
                                <h2 style={styles.title}>Thêm hồ sơ mới</h2>
                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Họ và tên *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newProfile.name}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Số điện thoại *</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={newProfile.phone}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Ngày sinh *</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={newProfile.dob}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Giới tính *</label>
                                    <select
                                        name="gender"
                                        value={newProfile.gender}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                                <div style={styles.box}>
                                    <div style={styles.formGroup2}>
                                        <label style={styles.label}>Tỉnh/Thành phố </label>
                                        <select
                                            name="city"
                                            value={newProfile.city}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        >
                                            <option value="">Chọn Tỉnh/Thành phố</option>
                                            <option value="Hà Nội">Hà Nội</option>
                                            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                            <option value="Đà Nẵng">Đà Nẵng</option>
                                            <option value="Hải Phòng">Hải Phòng</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                    <div style={styles.formGroup2}>
                                        <label style={styles.label}>Dân tộc </label>
                                        <select
                                            name="ethnicity"
                                            value={newProfile.ethnicity}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        >
                                            <option value="">Chọn dân tộc</option>
                                            <option value="Kinh">Kinh</option>
                                            <option value="Tày">Tày</option>
                                            <option value="Thái">Thái</option>
                                            <option value="Khmer">Khmer</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Địa chỉ </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={newProfile.address}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Số CMND/CCCD *</label>
                                    <input
                                        type="text"
                                        name="idCard"
                                        value={newProfile.idCard}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Nghề nghiệp </label>
                                    <input
                                        type="text"
                                        name="job"
                                        value={newProfile.job}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Email </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newProfile.email}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Mã BHYT </label>
                                    <input
                                        type="text"
                                        name="healthInsuranceCode"
                                        value={newProfile.healthInsuranceCode}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup2}>
                                    <label style={styles.label}>Mối quan hệ *</label>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Cha"
                                                checked={newProfile.relation.includes('Cha')}
                                                onChange={handleCheckboxChange}
                                            />
                                            Cha
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Mẹ"
                                                checked={newProfile.relation.includes('Mẹ')}
                                                onChange={handleCheckboxChange}
                                            />
                                            Mẹ
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Chồng"
                                                checked={newProfile.relation.includes('Chồng')}
                                                onChange={handleCheckboxChange}
                                            />
                                            Chồng
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Vợ"
                                                checked={newProfile.relation.includes('Vợ')}
                                                onChange={handleCheckboxChange}
                                            />
                                            Vợ
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Khác"
                                                checked={newProfile.relation.includes('Khác')}
                                                onChange={handleCheckboxChange}
                                            />
                                            Khác
                                        </label>
                                    </div>
                                </div>
                                <div style={styles.actionButtons}>
                                    <button style={styles.saveButton} onClick={handleSaveAddProfile}>
                                        Lưu
                                    </button>
                                    <button style={styles.cancelButton} onClick={handleCancelAddProfile}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {selectedProfile ? (
                                <>
                                    {!isEditing ? (
                                        <>
                                            <h2 style={styles.title}>{selectedProfile.name}</h2>
                                            <p style={styles.detailsParagraph}><strong>Mã BIN:</strong> {selectedProfile.binCode}</p>
                                            <p style={styles.detailsParagraph}><strong>Số điện thoại:</strong> {selectedProfile.phone}</p>
                                            <p style={styles.detailsParagraph}><strong>Ngày sinh:</strong> {selectedProfile.dob}</p>
                                            <p style={styles.detailsParagraph}><strong>Giới tính:</strong> {selectedProfile.gender}</p>
                                            <p style={styles.detailsParagraph}><strong>Địa chỉ:</strong> {selectedProfile.address}</p>
                                            <p style={styles.detailsParagraph}><strong>Mã BHYT:</strong> {selectedProfile.healthInsuranceCode}</p>
                                            <p style={styles.detailsParagraph}><strong>Số CMND/CCCD:</strong> {selectedProfile.idCard}</p>
                                            <p style={styles.detailsParagraph}><strong>Dân tộc:</strong> {selectedProfile.ethnicity}</p>
                                            <p style={styles.detailsParagraph}><strong>Nghề nghiệp:</strong> {selectedProfile.job}</p>
                                            <p style={styles.detailsParagraph}><strong>Email:</strong> {selectedProfile.email}</p>
                                            <div style={styles.actionButtons}>
                                                <button style={styles.editButton} onClick={handleStartEdit}>Chỉnh sửa</button>
                                                <button style={styles.deleteButton} onClick={() => handleDeleteProfile(selectedProfile.id)}>Xóa</button>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            <h2 style={styles.title}>Chỉnh sửa hồ sơ</h2>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Mã BIN:</strong></p>
                                                <input
                                                    type="text"
                                                    name="binCode"
                                                    value={editForm.binCode}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Số điện thoại:</strong></p>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={editForm.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Ngày sinh:</strong></p>
                                                <input
                                                    type="text"
                                                    name="dob"
                                                    value={editForm.dob}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Giới tính:</strong></p>
                                                <input
                                                    type="text"
                                                    name="gender"
                                                    value={editForm.gender}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Địa chỉ:</strong></p>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={editForm.address}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Mã BHYT:</strong></p>
                                                <input
                                                    type="text"
                                                    name="healthInsuranceCode"
                                                    value={editForm.healthInsuranceCode}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Số CMND/CCCD:</strong></p>
                                                <input
                                                    type="text"
                                                    name="idCard"
                                                    value={editForm.idCard}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Dân tộc:</strong></p>
                                                <input
                                                    type="text"
                                                    name="ethnicity"
                                                    value={editForm.ethnicity}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Nghề nghiệp:</strong></p>
                                                <input
                                                    type="text"
                                                    name="job"
                                                    value={editForm.job}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <p style={styles.detailsParagraph}><strong>Email:</strong></p>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={editForm.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div style={styles.actionButtons}>
                                                <button style={styles.saveButton} onClick={handleSaveEdit}>
                                                    Lưu
                                                </button>
                                                <button style={styles.cancelButton} onClick={handleCancelEdit}>
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div>Chọn một hồ sơ để xem chi tiết.</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Hiển thị form thêm hồ sơ


// CSS Styles
const styles = {
    container: {
        display: 'flex',
        gap: '20px',
        padding: '20px',
        maxWidth: '1200px',
        height: '100%',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    sidebar: {
        flex: 1,
        borderRight: '1px solid #ccc',
        paddingRight: '20px',
    },
    profileItem: {
        padding: '10px',
        margin: '5px 0',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    addButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    detailsContainer: {
        flex: 2,
        padding: '20px',
        position: 'relative',
    },
    title: {
        textAlign: 'center',
    },
    actionButtons: {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
    detailsParagraph: {
        fontSize: '20px',
        padding: '5px',
    },
    formGroup: {
        display: 'flex',
        marginBottom: '0px',
    },
    formGroup2: {
        display: 'flex',
        marginBottom: '10px',
    },
    formContainer: {
        maxWidth: '600px',
        margin: '0 auto',
    },
    box: {
        display: 'flex',
    }
};

export default UserProfiles;
