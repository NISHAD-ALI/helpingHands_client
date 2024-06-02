import React from 'react'

const Counter = () => {
  return (
    <div className="flex space-x-4 text-center my-6">
      {['Days', 'Hours', 'Mins', 'Secs'].map((label, index) => (
        <div key={index}>
          <div className="text-2xl font-bold">04</div>
          <div className="text-sm">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default Counter

