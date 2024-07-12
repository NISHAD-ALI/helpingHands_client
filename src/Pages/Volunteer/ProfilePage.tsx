import React from 'react';
import NavBar from '../../Components/VolunteerComponents/NavBar';
import Footer from '../../Components/Common/Footer';
import Profile from '../../Components/VolunteerComponents/Profile';

const ProfilePage: React.FC = () => {
    

    return (
        <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
         <NavBar /> 
           <Profile/>
            <Footer/>
       </div>
    );
};

export default ProfilePage;
