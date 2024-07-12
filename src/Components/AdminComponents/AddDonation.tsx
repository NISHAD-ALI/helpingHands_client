import React, { useState } from 'react';
import { createDonation } from '../../Api/adminApi';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const AddDonation: React.FC = () => {
  const [formData, setFormData] = useState({
    fundraiserName: '',
    email: '',
    targetAmount: '',
    donationType: 'Education',
    startDate: '',
    endDate: '',
    contactAddress: '',
    details: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('https://via.placeholder.com/100');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fundraiserName) newErrors.fundraiserName = 'Fundraiser Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.targetAmount) {
      newErrors.targetAmount = 'Target Amount is required';
    } else if (isNaN(Number(formData.targetAmount))) {
      newErrors.targetAmount = 'Target Amount must be a number';
    }
    if (!formData.startDate) newErrors.startDate = 'Start Date is required';
    if (!formData.endDate) newErrors.endDate = 'End Date is required';
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End Date must be later than Start Date';
    }
    if (!formData.contactAddress) newErrors.contactAddress = 'Contact Address is required';
    if (!formData.details) newErrors.details = 'Details are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const formDataInstance = new FormData();
      formDataInstance.append('fundraiserName', formData.fundraiserName);
      formDataInstance.append('email', formData.email);
      formDataInstance.append('targetAmount', formData.targetAmount);
      formDataInstance.append('donationType', formData.donationType);
      formDataInstance.append('startDate', formData.startDate);
      formDataInstance.append('endDate', formData.endDate);
      formDataInstance.append('contactAddress', formData.contactAddress);
      formDataInstance.append('details', formData.details);
      if (image) {
        formDataInstance.append('image', image);
      }

      const response = await createDonation(formDataInstance); 
      if(response?.data?.success){
        toast.success('New Fundraiser has been successFully created ✨')
        setTimeout(() => {
          navigate('/admin/donationManagement')
      }, 2000);
        
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl" onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <div className="relative w-24 h-24 mr-4">
            <img
              src={imagePreview}
              alt="profile"
              className="w-full h-full rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
              ✎
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="w-full">
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700 mb-2" htmlFor="fundraiserName">Fundraiser Name</label>
                <input
                  type="text"
                  id="fundraiserName"
                  name="fundraiserName"
                  value={formData.fundraiserName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.fundraiserName && (
                  <span className="text-red-500 text-sm">{errors.fundraiserName}</span>
                )}
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700 mb-2" htmlFor="targetAmount">Target Amount</label>
                <input
                  type="text"
                  id="targetAmount"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.targetAmount && (
                  <span className="text-red-500 text-sm">{errors.targetAmount}</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700 mb-2" htmlFor="donationType">Donation Type</label>
                <select
                  id="donationType"
                  name="donationType"
                  value={formData.donationType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Education">Education</option>
                  <option value="Medical">Medical</option>
                  <option value="Food">Food</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700 mb-2" htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.startDate && (
                  <span className="text-red-500 text-sm">{errors.startDate}</span>
                )}
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700 mb-2" htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.endDate && (
                  <span className="text-red-500 text-sm">{errors.endDate}</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full px-2">
                <label className="block text-gray-700 mb-2" htmlFor="contactAddress">Contact Address</label>
                <input
                  type="text"
                  id="contactAddress"
                  name="contactAddress"
                  value={formData.contactAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.contactAddress && (
                  <span className="text-red-500 text-sm">{errors.contactAddress}</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full px-2">
                <label className="block text-gray-700 mb-2" htmlFor="details">Details</label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.details && (
                  <span className="text-red-500 text-sm">{errors.details}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            Save
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />

    </div>
  );
};

export default AddDonation;
