import React, { useState, useEffect } from "react";
import { getProfileVolunteer, editProfileVolunteer } from "../../Api/volunteerApi";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        age: '',
        bloodGroup: '',
        address: '',
        aboutMe: '',
        profileImage: '',
        phone: '',
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getProfileVolunteer();
                let data = response?.data?.data;
                if (data) {
                    setProfileData({
                        name: data.name,
                        email: data.email,
                        age: data.age,
                        bloodGroup: data.bloodGroup,
                        address: data.address,
                        aboutMe: data.aboutMe,
                        profileImage: data.profileImage,
                        phone: data.phone,
                    });
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        getData();
    }, []);

    const handleEdit = async () => {
        if (isEditing) {
            const formData = new FormData();
            formData.append('name', profileData.name);
            formData.append('email', profileData.email);
            formData.append('age', profileData.age);
            formData.append('bloodGroup', profileData.bloodGroup);
            formData.append('address', profileData.address);
            formData.append('aboutMe', profileData.aboutMe);
            formData.append('phone', profileData.phone);

            if (selectedFile) {
                formData.append('profileImage', selectedFile);
            }

            try {
                let response = await editProfileVolunteer(formData);
                if (response?.data.success) {
                    navigate('/volunteer/profile');
                }
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setProfileData({ ...profileData, profileImage: URL.createObjectURL(e.target.files[0]) });
        }
    };

    return (
        <div>
            <main className="container mx-auto mt-10 p-6 mb-20 bg-white rounded-lg shadow-md relative">
                <div className="absolute top-0 right-0 m-4">
                    <button onClick={handleEdit} className="bg-green-500 text-white py-2 px-4 rounded">
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <label htmlFor="image" className="block text-gray-700">Image</label>
                        {isEditing ? (
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full h-auto rounded-lg"
                                onChange={handleFileChange}
                                id="image"
                            />
                        ) : (
                            <img className="w-full h-auto rounded-lg" src={profileData.profileImage} alt="Profile" />
                        )}
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{profileData.name}</h2>
                        <section className={`mb-6 ${isEditing ? '' : 'hidden'}`}>
                            <h3 className="text-xl font-semibold mb-2">Personal Information:</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        value={profileData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-gray-700">Age</label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        value={profileData.age}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="bloodGroup" className="block text-gray-700">Blood Group</label>
                                    <select
                                        id="bloodGroup"
                                        name="bloodGroup"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        value={profileData.bloodGroup}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="address" className="block text-gray-700">Residing Address</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        value={profileData.address}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="aboutMe" className="block text-gray-700">About Me</label>
                                    <textarea
                                        id="aboutMe"
                                        name="aboutMe"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        value={profileData.aboutMe}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        value={profileData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </section>
                        <section className={`${isEditing ? 'hidden' : ''}`}>
                            <h3 className="text-xl font-semibold mb-2">Personal Information:</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <p className="text-gray-800">{profileData.name}</p>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <p className="text-gray-800">{profileData.email}</p>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Age</label>
                                    <p className="text-gray-800">{profileData.age}</p>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Blood Group</label>
                                    <p className="text-gray-800">{profileData.bloodGroup}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-gray-700">Residing Address</label>
                                    <p className="text-gray-800">{profileData.address}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-gray-700">About Me</label>
                                    <p className="text-gray-800">{profileData.aboutMe}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-gray-700">Phone No.</label>
                                    <p className="text-gray-800">{profileData.phone}</p>
                                </div>
                            </div>
                        </section>
                        <div className="text-right">
                            <a onClick={() => navigate('/volunteer/changePassword')} className="text-blue-600 hover:underline">Forgot password/change Password?</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;
