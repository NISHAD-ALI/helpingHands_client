import React from 'react'
import CommunityMessages from '../../Components/CommunityComponents/CommunityMessages'
import NavBar from '../../Components/CommunityComponents/NavBar'

const CommunityMessagesPage:React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
      <NavBar bgColor="bg-gray-600" />
        <CommunityMessages />
    </div>
  )
}

export default CommunityMessagesPage
