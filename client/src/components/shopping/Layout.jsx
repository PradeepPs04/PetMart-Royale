import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './Header'

const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* common header */}
        <div className='h-16'>
            <ShoppingHeader/>
        </div>
        
        <main className='flex flex-col w-full'>
            <Outlet/>
        </main>
    </div>
  )
}

export default ShoppingLayout