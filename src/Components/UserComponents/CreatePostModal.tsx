import React, { useState, useRef, ChangeEvent } from 'react';
import { createPost } from '../../Api/userApi';
import AvatarEditor from 'react-avatar-editor';
import  { Toaster } from 'react-hot-toast';
interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleNextStep = () => {
    if (step === 1 && selectedImage) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (selectedImage && title && editorRef.current) {
        const canvas = editorRef.current.getImageScaledToCanvas();
        canvas.toBlob(async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append('image', blob, selectedImage.name);
            formData.append('title', title);
            const response = await createPost(formData);
            if (response) {
              onClose();
              window.location.reload();
            }
          }
        }, 'image/jpeg');
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 mx-2 w-full max-w-md">
        <div className="flex justify-end">
          <button className="text-white font-bold bg-red-600 px-3 rounded-md" onClick={onClose}>
            X
          </button>
        </div>
        {step === 1 && (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Step 1: Select Image</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image-upload">
              Upload Image:
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Selected" className="mt-4 w-full h-auto rounded-lg" />
            )}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleNextStep}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Step 2: Crop Image & Enter Title with description</h1>
            <div className="w-full max-w-md mx-auto">
              <AvatarEditor
                ref={editorRef}
                image={imagePreview || ''}
                width={360}
                height={360}
                border={0}
                color={[255, 255, 255, 0.6]}
                scale={1}
                rotate={0}
                borderRadius={0}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post-title">
              Title:
            </label>
            <textarea
              id="post-title"
              className="w-full p-2 border rounded-lg"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            ></textarea>
            <div className="flex space-x-4 mt-4">
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={handleBackStep}>
                Back
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
    </div>
  );
};

export default CreatePostModal;
