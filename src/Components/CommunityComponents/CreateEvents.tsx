import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { createEvents } from '../../Api/communityApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import io from 'socket.io-client';

interface Shift {
    date: string;
    timeSlot: string;
}

const CreateEvents: React.FC = () => {
    const navigate = useNavigate();
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const [volunteerCount, setVolunteerCount] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [images, setImages] = useState<(File | null)[]>([null, null, null]);
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null]);
    const [category, setCategory] = useState<string>('');
    const [onlineEvent, setOnlineEvent] = useState<boolean>(false);
    const [city, setCity] = useState<string>('');
    const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const socket = io('http://localhost:3001');

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    useEffect(() => {
        if (city) {
            fetchCitySuggestionsDebounced(city);
        } else {
            setCitySuggestions([]);
        }
    }, [city]);

    const fetchCitySuggestions = async (query: string) => {
        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/city?name=${query}`, {
                headers: { 'X-Api-Key': 'LduWU6TiMaLMwXi3+EAkWQ==8pfk3OMq7B4LOR68' }
            });
            setCitySuggestions(response.data.map((city: { name: string }) => city.name));
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
        }
    };

    const fetchCitySuggestionsDebounced = debounce(fetchCitySuggestions, 300);

    const addShift = () => {
        setShifts([...shifts, { date: '', timeSlot: '9am - 1pm' }]);
        setErrors([...errors, '']);
    };

    const handleShiftChange = (index: number, field: keyof Shift, value: string) => {
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

    const validateShiftDate = (shifts: Shift[], index: number) => {
        const selectedDate = new Date(shifts[index].date);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            const newErrors = [...errors];
            newErrors[index] = 'Selected date cannot be earlier than the current date.';
            toast.error('Selected date cannot be earlier than the current date.');
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
        setIsLoading(true);

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
        formData.append('category', category);
        formData.append('is_online', onlineEvent.toString());
        formData.append('city', city);

        try {
            const response = await createEvents(formData);
            if (response) {
                toast.success('Event Created Successfully');
                const socket = io('http://localhost:3001');
                socket.emit('receiveNotification', { message: 'New Event created' });
                setTimeout(() => {
                    navigate('/community/home');
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="spinner1 flex justify-center items-center space-x-2">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h1 className="mt-4 text-lg text-white font-bold text-center">Hang on tight while we create your event...</h1>
            </div>
        );
    }

    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-center">Create An Event</h1>
                <h4 className="text-sm mb-8 text-center">Let your Volunteers Know your plan</h4>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4">Basic Details:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name Of Event:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" />

                            <label htmlFor='volunteer' className="block mb-2 text-sm font-medium text-gray-700">No. of Volunteers Participating:</label>
                            <input id='volunteer' type="number" value={volunteerCount} onChange={(e) => setVolunteerCount(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" />

                            <label htmlFor='details' className="block mb-2 text-sm font-medium text-gray-700">Details:</label>
                            <textarea id='details' value={details} onChange={(e) => setDetails(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"></textarea>

                            <label htmlFor='category' className="block mb-2 text-sm font-medium text-gray-700">Category:</label>
                            <select id='category' value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent">
                                <option value="">Select a category</option>
                                <option value="Health care">Health care</option>
                                <option value="Education">Education</option>
                                <option value="Shelters and support">Shelters and support</option>
                                <option value="Food">Food</option>
                                <option value="Child welfare">Child welfare</option>
                                <option value="Youth Recreation">Youth Recreation</option>
                            </select>

                            <label className="block mb-2 text-sm font-medium text-gray-700">City:</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                placeholder="Start typing a city name..."
                            />
                            {citySuggestions.length > 0 && (
                                <ul className="border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
                                    {citySuggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => {
                                                setCity(suggestion);
                                                setCitySuggestions([]);
                                            }}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="flex items-center space-x-4 mt-4">
                                <button
                                    type="button"
                                    className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${onlineEvent ? 'bg-green-600' : 'bg-gray-200'
                                        }`}
                                    onClick={() => setOnlineEvent(!onlineEvent)}
                                    aria-label='button'
                                >
                                    <span
                                        className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${onlineEvent ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                                <span className="text-sm font-medium text-gray-700">Online Event</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Date & Time:</h2>
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {shifts.map((shift, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-center">
                                <label htmlFor={`date-${index}`} className="block mb-2 text-sm font-medium text-gray-700">
                                    Date:
                                </label>
                                <input
                                    type="date"
                                    id={`date-${index}`}
                                    value={shift.date}
                                    onChange={(e) => handleShiftChange(index, 'date', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-transparent"
                                />

                                <label htmlFor={`timeSlot-${index}`} className="block mb-2 text-sm font-medium text-gray-700">
                                    Time Slot:
                                </label>
                                <select
                                    id={`timeSlot-${index}`}
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

                                <button aria-label='button' type="button" onClick={() => removeShift(index)} className="text-red-500 hover:text-red-700 focus:outline-none">
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
