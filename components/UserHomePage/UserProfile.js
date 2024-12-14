import React, { Link, useState, useEffect } from 'react';
import styles from "./UserProfile.module.css"
import Header from "./Header"
import LichKham from "./LichKham"
const UserProfiles = () => {
    const [activeTab, setActiveTab] = useState('lichKham');
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
    const handleTabClick = (tab) => {
        setActiveTab(tab); // Đổi tab hiện tại
    };
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
    return (<>
        <div className={styles.UserHPContainer}>
            <Header></Header>
            <div className={styles.functionProfile}>
                <ul>
                    <li className={activeTab === 'lichKham' ? styles.active : ''}
                        onClick={() => handleTabClick('lichKham')}>Lịch khám</li>
                    <li className={activeTab === 'hoSo' ? styles.active : ''}
                        onClick={() => handleTabClick('hoSo')}>Hồ sơ</li>
                </ul>
            </div>

            <div className={styles.container}>
                {activeTab === 'hoSo' && (<>
                    <div className={styles.sidebar}>
                        <h3>Danh sách hồ sơ</h3>
                        {profiles.map((profile, index) => (
                            <div
                                key={profile.id}
                                className={styles.profileItem}
                                style={{
                                    backgroundColor: selectedProfile?.id === profile.id ? '#007BFF' : '#f0f0f0',
                                    color: selectedProfile?.id === profile.id ? '#fff' : '#000',
                                }}
                                onClick={() => {
                                    if (!isEditing) {
                                        setSelectedProfile(profile); // Lưu hồ sơ đã chọn vào state
                                    }
                                }}
                            >
                                Hồ sơ {index + 1}
                            </div>
                        ))}

                        {/* Nút thêm hồ sơ */}
                        <button className={styles.addButton} onClick={() => handleAddProfileForm()}>
                            Thêm hồ sơ
                        </button>
                    </div>
                    <div className={styles.detailsContainer}>
                        {isAddingProfile ? (
                            <>
                                <div className={styles.formContainer}>
                                    <h2 className={styles.title}>Thêm hồ sơ mới</h2>
                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Họ và tên *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newProfile.name}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Số điện thoại *</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={newProfile.phone}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Ngày sinh *</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={newProfile.dob}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Giới tính *</label>
                                        <select
                                            name="gender"
                                            value={newProfile.gender}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        >
                                            <option value="">Chọn giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                    </div>
                                    <div className={styles.box}>
                                        <div className={styles.formGroup2}>
                                            <label className={styles.label}>Tỉnh/Thành phố </label>
                                            <select
                                                name="city"
                                                value={newProfile.city}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                            >
                                                <option value="">Chọn Tỉnh/Thành phố</option>
                                                <option value="Hà Nội">Hà Nội</option>
                                                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                                <option value="Đà Nẵng">Đà Nẵng</option>
                                                <option value="Hải Phòng">Hải Phòng</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup2}>
                                            <label className={styles.label}>Dân tộc </label>
                                            <select
                                                name="ethnicity"
                                                value={newProfile.ethnicity}
                                                onChange={handleInputChange}
                                                className={styles.input}
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

                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Địa chỉ </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={newProfile.address}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Số CMND/CCCD *</label>
                                        <input
                                            type="text"
                                            name="idCard"
                                            value={newProfile.idCard}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Nghề nghiệp </label>
                                        <input
                                            type="text"
                                            name="job"
                                            value={newProfile.job}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Email </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newProfile.email}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Mã BHYT </label>
                                        <input
                                            type="text"
                                            name="healthInsuranceCode"
                                            value={newProfile.healthInsuranceCode}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.formGroup2}>
                                        <label className={styles.label}>Mối quan hệ *</label>
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
                                    <div className={styles.actionButtons}>
                                        <button className={styles.saveButton} onClick={handleSaveAddProfile}>
                                            Lưu
                                        </button>
                                        <button className={styles.cancelButton} onClick={handleCancelAddProfile}>
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
                                                <h2 className={styles.title}>{selectedProfile.name}</h2>
                                                <p className={styles.detailsParagraph}><strong>Mã BIN:</strong> {selectedProfile.binCode}</p>
                                                <p className={styles.detailsParagraph}><strong>Số điện thoại:</strong> {selectedProfile.phone}</p>
                                                <p className={styles.detailsParagraph}><strong>Ngày sinh:</strong> {selectedProfile.dob}</p>
                                                <p className={styles.detailsParagraph}><strong>Giới tính:</strong> {selectedProfile.gender}</p>
                                                <p className={styles.detailsParagraph}><strong>Địa chỉ:</strong> {selectedProfile.address}</p>
                                                <p className={styles.detailsParagraph}><strong>Mã BHYT:</strong> {selectedProfile.healthInsuranceCode}</p>
                                                <p className={styles.detailsParagraph}><strong>Số CMND/CCCD:</strong> {selectedProfile.idCard}</p>
                                                <p className={styles.detailsParagraph}><strong>Dân tộc:</strong> {selectedProfile.ethnicity}</p>
                                                <p className={styles.detailsParagraph}><strong>Nghề nghiệp:</strong> {selectedProfile.job}</p>
                                                <p className={styles.detailsParagraph}><strong>Email:</strong> {selectedProfile.email}</p>
                                                <div className={styles.actionButtons}>
                                                    <button className={styles.editButton} onClick={handleStartEdit}>Chỉnh sửa</button>
                                                    <button className={styles.deleteButton} onClick={() => handleDeleteProfile(selectedProfile.id)}>Xóa</button>
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                <h2 className={styles.title}>Chỉnh sửa hồ sơ</h2>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Mã BIN:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="binCode"
                                                        value={editForm.binCode}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Số điện thoại:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={editForm.phone}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Ngày sinh:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="dob"
                                                        value={editForm.dob}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Giới tính:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="gender"
                                                        value={editForm.gender}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Địa chỉ:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={editForm.address}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Mã BHYT:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="healthInsuranceCode"
                                                        value={editForm.healthInsuranceCode}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Số CMND/CCCD:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="idCard"
                                                        value={editForm.idCard}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Dân tộc:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="ethnicity"
                                                        value={editForm.ethnicity}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Nghề nghiệp:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="job"
                                                        value={editForm.job}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <p className={styles.detailsParagraph}><strong>Email:</strong></p>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={editForm.email}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className={styles.actionButtons}>
                                                    <button className={styles.saveButton} onClick={handleSaveEdit}>
                                                        Lưu
                                                    </button>
                                                    <button className={styles.cancelButton} onClick={handleCancelEdit}>
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
                </>
                )}
                {activeTab === 'lichKham' && (
                    <div>
                        <LichKham></LichKham>
                    </div>
                )}
            </div>
        </div>
    </>
    );
};
export default UserProfiles;
