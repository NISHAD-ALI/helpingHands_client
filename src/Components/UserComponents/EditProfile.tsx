import React, { useState, useEffect } from 'react';
import { editProfile } from '../../Api/userApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

interface Userdata {
    name: string;
    email: string;
    address: string;
    phone: number;
    profileImage: string;
}

interface LocationState {
    state: {
        data: Userdata;
    };
}

const EditProfile: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location as LocationState;
    const data = state?.data;

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(data?.profileImage || '');

    useEffect(() => {
        if (profileImage) {
            const newImageUrl = URL.createObjectURL(profileImage);
            setImageUrl(newImageUrl);
            return () => URL.revokeObjectURL(newImageUrl);
        }
    }, [profileImage]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfileImage(e.target.files[0]);
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Username is required')
            .min(2, 'Username must be at least 2 characters long')
            .max(50, 'Username must be less than 50 characters long'),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
        address: Yup.string()
            .required('Address is required')
            .min(5, 'Address must be at least 5 characters long')
            .max(100, 'Address must be less than 100 characters long'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]+$/, 'Phone number must only contain digits')
            .min(10, 'Phone number must be 10 digits')
            .max(10, 'Phone number must be 10 digits'),
    });

    const handleSubmit = async (values: Userdata) => {
        try {
            let formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('address', values.address);
            formData.append('phone', values.phone.toString());
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }
            let response = await editProfile(formData);
            if (response?.data.success) {
                navigate('/profile');
                toast.success("Profile updated successfully!");
            }
        } catch (error :any) {
            console.error(error);
            toast.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-200">
            <Formik
                initialValues={{
                    name: data?.name || '',
                    email: data?.email || '',
                    address: data?.address || '',
                    phone: data?.phone.toString() || '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row md:space-x-6 w-full max-w-4xl">
                        <div className="relative w-full max-w-[50%] md:max-w-[50%] h-auto mb-4 aspect-square">
                            <img
                                src={imageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover rounded"
                            />
                            <label className="absolute bottom-0 w-full text-center bg-gray-800 bg-opacity-75 text-white cursor-pointer p-1 rounded-b">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        handleImageChange(e);
                                        setFieldValue('profileImage', e.target.files[0]);
                                    }}
                                />
                                Upload Photo
                            </label>
                        </div>
                        <div className="flex flex-col md:w-1/2 space-y-4">
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Username</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Address</label>
                                <Field
                                    type="text"
                                    name="address"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                <ErrorMessage name="address" component="div" className="text-red-600 text-sm" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone</label>
                                <Field
                                    type="text"
                                    name="phone"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfile;
