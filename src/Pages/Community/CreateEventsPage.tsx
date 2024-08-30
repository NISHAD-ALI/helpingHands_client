import React from 'react'
import NavBar from '../../Components/CommunityComponents/NavBar'
import CreateEvents from '../../Components/CommunityComponents/CreateEvents'

const CreateEventsPage:React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
       <NavBar bgColor="bg-gray-600" />
        <CreateEvents />
      
    </div>
  )
}

export default CreateEventsPage
