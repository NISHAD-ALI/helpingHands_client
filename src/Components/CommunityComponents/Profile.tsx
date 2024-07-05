import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editProfile, getProfile } from "../../Api/communityApi";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    about: '',
    profileImage: '',
    phone: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getProfile();
      let data = response?.data?.data;
      console.log(data)
      setProfileData({
        name: data.name,
        email: data.email,
        about: data.about,
        profileImage: data.profileImage,
        phone: data.phone,
      });
    };
    getData();
  }, []);

  const handleEdit = async () => {
    if (isEditing) {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      formData.append('about', profileData.about);
      formData.append('phone', profileData.phone);

      if (selectedFile) {
        formData.append('profileImage', selectedFile);
      }

      try {
        let response = await editProfile(formData);
        if (response?.data.success) {
          navigate('/community/profile');
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setProfileData({ ...profileData, profileImage: URL.createObjectURL(e.target.files[0]) });
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
            {isEditing ? (
              <div>
                <label className="block text-gray-700" htmlFor="profileImage">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  className="w-full h-auto rounded-lg"
                  onChange={handleFileChange}
                />
              </div>
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
                  <label className="block text-gray-700" htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={profileData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700" htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={profileData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700" htmlFor="about">About Me</label>
                  <textarea
                    name="about"
                    id="about"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={profileData.about}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700" htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
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
                <div className="col-span-2">
                  <label className="block text-gray-700">About Me</label>
                  <p className="text-gray-800">{profileData.about}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Phone No.</label>
                  <p className="text-gray-800">{profileData.phone}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
