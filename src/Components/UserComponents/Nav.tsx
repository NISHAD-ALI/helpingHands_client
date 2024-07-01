import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../Redux/Slices/Auth';
import { useState, useEffect } from 'react';
import { logout, getProfile } from '../../Api/userApi';

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [image, setImage] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.userData !== null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getProfile();
        setUserName(response?.data?.data?.name || null);
        setImage(response?.data?.data?.profileImage || '');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(userLogout());
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`w-full text-gray-700 transition-all duration-300 ${isSticky ? 'bg-white bg-opacity-95 shadow-md' : 'bg-transparent'} dark-mode:text-gray-200 dark-mode:bg-gray-800`}>
      <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="p-4 flex flex-row items-center justify-between">
          <a href="/" className="text-4xl leading-relaxed font-bold font-inter tracking-normal text-green-700 rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">helpingHands</a>
          <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={() => setOpen(!open)}>
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        <nav className={`flex-col ${open ? 'flex' : 'hidden'} md:flex md:flex-row md:justify-end md:flex-row`}>
          <button className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors duration-300" onClick={() => navigate('/')}>Home</button>
          <button className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors duration-300" onClick={() => navigate('/donate')}>Donate</button>
          <button className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors duration-300" onClick={() => navigate('/about')}>About</button>
          {isLoggedIn ? (
            <>
              <button className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors duration-300" onClick={handleLogout}>Logout</button>
              <button className="px-4 py-2 mt-2 ml-2 text-sm font-semibold bg-green-500 rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors duration-300" onClick={() => navigate('/profile')}>
                <div className="flex items-center">
                  {image ? (<img src={image} alt="Profile" className="w-7 h-6 rounded-full mr-2" />) : ''}
                  {userName}
                </div>
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors duration-300" onClick={() => navigate('/login')}>Login</button>
              <button className="px-4 py-2 mt-2 text-sm font-semibold bg-green-500 rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors duration-300" onClick={() => navigate('/signup')}>SignUp</button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Nav;
