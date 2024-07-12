
import React from 'react'
import AddDonation from '../../Components/AdminComponents/AddDonation'
import Sidebar from '../../Components/AdminComponents/Sidebar'

const AddDonationPage:React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-4">
        <AddDonation />
      </div>
    </div>
  )
}

export default AddDonationPage
