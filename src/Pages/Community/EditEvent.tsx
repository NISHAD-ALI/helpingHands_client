import React from 'react'
import NavBar from '../../Components/CommunityComponents/NavBar'
import EditEvents from '../../Components/CommunityComponents/EditEvents'

const EditEvent:React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
        <NavBar bgColor="bg-gray-600" />
        <EditEvents />
      
    </div>
  )
}

export default EditEvent
