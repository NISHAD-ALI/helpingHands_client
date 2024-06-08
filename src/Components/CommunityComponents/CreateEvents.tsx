import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { createEvents } from '../../Api/communityApi';
import { useNavigate } from 'react-router-dom';

const CreateEvents: React.FC = () => {
    const navigate = useNavigate()
    const [shifts, setShifts] = useState<{ date: string, timeSlot: string }[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const [volunteerCount, setVolunteerCount] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [images, setImages] = useState<(File | null)[]>([null, null, null]);
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([null, null, null]);

    const addShift = () => {
        setShifts([...shifts, { date: '', timeSlot: '9am - 1pm' }]);
        setErrors([...errors, '']);
    };

    const handleShiftChange = (index: number, field: string, value: string) => {
        const newShifts = [...shifts];
        newShifts[index] = { ...newShifts[index], [field]: value };
        setShifts(newShifts);

        if (field === 'date') {
            validateShiftDate(newShifts, index);
        }
    };

    const removeShift = (index: number) => {
        const newShifts = shifts.filter((_, i) => i !== index);
        const newErrors = errors.filter((_, i) => i !== index);
        setShifts(newShifts);
        setErrors(newErrors);
    };

    const validateShiftDate = (shifts: typeof shifts, index: number) => {
        const selectedDate = new Date(shifts[index].date);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            const newErrors = [...errors];
            newErrors[index] = 'Selected date cannot be earlier than the current date.';
            toast.error("Selected date cannot be earlier than the current date.");
            setErrors(newErrors);
        } else {
            const newErrors = [...errors];
            newErrors[index] = '';
            setErrors(newErrors);
        }
    };

    const handleImagesChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newImages = [...images];
            newImages[index] = e.target.files[0];
            setImages(newImages);

            const newPreviews = [...imagePreviews];
            newPreviews[index] = URL.createObjectURL(e.target.files[0]);
            setImagePreviews(newPreviews);
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const videoFile = e.target.files[0];
            setVideo(videoFile);
            setVideoPreview(URL.createObjectURL(videoFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        images.forEach((image, index) => {
            if (image) {
                formData.append(`image${index + 1}`, image);
            }
        });

        if (video) {
            formData.append('video', video);
        }
        formData.append('name', name);
        formData.append('volunteerCount', volunteerCount);
        formData.append('details', details);
        formData.append('shifts', JSON.stringify(shifts));
        
        try {
            const response = await createEvents(formData)
            if(response){
                toast.success('Event Created Successfully')
                navigate('/community/home')
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-center">Create An Event</h1>
                <h4 className="text-sm mb-8 text-center">Let your Volunteers Know your plan</h4>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4">Basic Details:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="flex flex-col items-center">
                            <div className="w-full md:w-1/2 mb-4">
                                <div className="bg-gray-200 rounded-lg flex items-center justify-center h-48 mb-4">
                                    {videoPreview ? (
                                        <video src={videoPreview} controls className="h-full w-full object-cover" />
                                    ) : (
                                        <label htmlFor="videoUpload" className="cursor-pointer text-gray-500">Insert a one minute Video</label>
                                    )}
                                    <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="videoUpload" />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="bg-gray-200 rounded-lg h-24 flex items-center justify-center relative">
                                            {preview ? (
                                                <img src={preview} alt={`preview ${index}`} className="h-full w-full object-cover rounded-lg" />
                                            ) : (
                                                <label htmlFor={`imageUpload${index}`} className="cursor-pointer text-gray-500 absolute inset-0 flex items-center justify-center">
                                                    Image
                                                </label>
                                            )}
                                            <input type="file" accept="image/*" onChange={(e) => handleImagesChange(index, e)} className="hidden" id={`imageUpload${index}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="name">Name Of Event:</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} id="name" className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" />

                            <label className="block mb-2 text-sm font-medium text-gray-700">No. of Volunteers Participating:</label>
                            <input type="number" onChange={(e) => setVolunteerCount(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" />

                            <label className="block mb-2 text-sm font-medium text-gray-700">Details:</label>
                            <textarea onChange={(e) => setDetails(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"></textarea>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Date & Time:</h2>
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {shifts.map((shift, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-center">
                                <input
                                    type="date"
                                    value={shift.date}
                                    onChange={(e) => handleShiftChange(index, 'date', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-transparent"
                                />
                                <select
                                    value={shift.timeSlot}
                                    onChange={(e) => handleShiftChange(index, 'timeSlot', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-transparent"
                                >
                                    {['9am - 1pm', '1pm - 5pm'].map((slot) => (
                                        <option key={slot} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                                <button type="button" onClick={() => removeShift(index)} className="text-red-500 hover:text-red-700 focus:outline-none">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                {errors[index] && <div className="text-red-500 text-sm mt-1">{errors[index]}</div>}
                            </div>
                        ))}
                    </div>

                    <button type="button" onClick={addShift} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 mx-auto block">
                        + Add Shift
                    </button>

                    <div className="mt-8 flex justify-end">
                        <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
        </section>
    );
};

export default CreateEvents;
