import React, { useEffect, useState } from 'react';
// Giả lập dữ liệu
const fetchData = async () => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(
                Array.from({ length: 5 }, (_, index) => ({
                    id: index + 1,
                    role: `Role ${index + 1}`,
                    name: `Person ${index + 1}`,
                    workingHours: '9:00 AM - 5:00 PM',
                    workLocation: 'Hanoi, Vietnam',
                }))
            );
        }, 1000)
    );
};

const ProfileCardList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [profilesPerPage] = useState(3); // Số lượng thẻ trên mỗi trang

    useEffect(() => {
        const getProfiles = async () => {
            try {
                setLoading(true);
                const data = await fetchData();
                setProfiles(data);
            } catch (err) {
                setError('Lỗi khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        getProfiles();
    }, []);

    // Tính toán dữ liệu cho từng trang
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

    // Xử lý chuyển trang
    const totalPages = Math.ceil(profiles.length / profilesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (profiles.length === 0) return <div>Hiện tại không có lịch khám.</div>;


    return (
        <div> {/* Kiểm tra nếu không có dữ liệu */}
            {profiles.length === 0 ? (
                <div style={styles.emptyContainer}>
                    <p>Hiện tại không có lịch khám.</p>
                </div>
            ) : (
                <>
                    {/* Danh sách các thẻ */}
                    <div style={styles.listContainer}>
                        {currentProfiles.map((profile) => (
                            <div key={profile.id} style={styles.card}>
                                <div style={styles.imageContainer}>
                                    <img
                                        src="https://via.placeholder.com/100"
                                        alt="Profile"
                                        style={styles.image}
                                    />
                                </div>
                                <div style={styles.infoContainer}>
                                    <div style={styles.infoItem1}>
                                        <strong>{profile.role},</strong> {profile.name}
                                    </div>
                                    <div style={styles.infoItem2}>
                                        {profile.workingHours}
                                    </div>
                                    <div style={styles.infoItem3}>
                                        <strong>Location</strong>: {profile.workLocation}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Nút bấm chuyển trang */}
                    <div style={styles.paginationContainer}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                style={{
                                    ...styles.pageButton,
                                    backgroundColor: currentPage === index + 1 ? '#007BFF' : '#f0f0f0',
                                    color: currentPage === index + 1 ? '#fff' : '#000',
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// CSS Styles
const styles = {
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        padding: '20px',
        width: '100%'
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '8px',
        width: '1000px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    imageContainer: {
        marginRight: '20px',
    },
    image: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
    },
    infoContainer: {
        flex: 1,
    },
    infoItem1: {
        color: '#68E1FC',
        marginBottom: '10px',
    },
    infoItem2: {
        color: '#FFB800',
        marginBottom: '10px',
    },
    infoItem3: {
        marginBottom: '10px',
    },
    paginationContainer: {
        position: 'absolute',
        transform: 'translateX(130%)',
        top: '640px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    pageButton: {
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ProfileCardList;
