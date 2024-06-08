import React, { useEffect, useState } from 'react';
import { changePasswordVolunteer, getProfileVolunteer } from '../../Api/volunteerApi';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getProfileVolunteer();
        const data = response?.data?.data;
        setId(data._id);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await changePasswordVolunteer( password, id );
      if (response) {
        navigate('/volunteer/profile');
      }
    } catch (error) {
      setError('Failed to change password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col">
     

      <main className="flex flex-grow justify-center items-center">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center mb-4">Change Password</h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Create New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Re-enter New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <ul className="text-sm text-gray-600">
                <li className={`mt-2 ${password.length >= 8 ? 'text-green-600' : 'text-red-600'}`}>Use 8 or more characters</li>
                <li className={`mt-2 ${/[a-z]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>One lowercase character</li>
                <li className={`mt-2 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>One uppercase character</li>
                <li className={`mt-2 ${/[0-9]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>One number</li>
                <li className={`mt-2 ${/[^a-zA-Z0-9]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>One special character</li>
              </ul>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Submit</button>
          </form>
        </div>
      </main>

    
    </div>
  );
};

export default ChangePassword;
