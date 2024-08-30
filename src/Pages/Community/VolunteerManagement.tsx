import React from 'react'
import NavBar from '../../Components/CommunityComponents/NavBar'
import Footer from '../../Components/Common/Footer'
import VolunteerTable from '../../Components/CommunityComponents/VolunteerTable'

const VolunteerManagement: React.FC = () => {
    

   

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar bgColor="bg-gray-600" />
            <div className='p-10 rounded-lg mt-10'>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Volunteer Management</h1>
                    
                </div>
                <VolunteerTable />
            </div>
            <Footer />
        </div>
    )
}

export default VolunteerManagement
