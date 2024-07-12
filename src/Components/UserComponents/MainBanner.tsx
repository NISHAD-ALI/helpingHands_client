import React from 'react'

const MainBanner:React.FC = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen -mt-20'>
        <h1 className='text-6xl font-bold text-center mb-2 md:mb-6'>
          Help a hand,<br/>
          Make a change
        </h1>
        <img src="/public/Vector 32.png" alt="Vector 32" width={400}/>
        <p className='text-sm font-bold text-center'>
        "Join our community-driven platform where compassion meets<br/> action.Together, we're a force for good, bringing hope, support,<br/> and empowerment to those in need. Join us and make an impact <br/>today."
        </p>
      </div>
    </div>
  )
}

export default MainBanner
