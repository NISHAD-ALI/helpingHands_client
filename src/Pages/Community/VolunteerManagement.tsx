import React from 'react'
import NavBar from '../../Components/CommunityComponents/NavBar'
import Footer from '../../Components/Common/Footer'
import VolunteerTable from '../../Components/CommunityComponents/VolunteerTable'

const VolunteerManagement: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <div className='p-10 rounded-lg'>
                <VolunteerTable />
            </div>
            <Footer />
        </div>
    )
}

export default VolunteerManagement
