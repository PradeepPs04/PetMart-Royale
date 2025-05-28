import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

// components
import AdminHeader from './Header'
import AdminSidebar from './Sidebar'

const AdminLayout = () => {

  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className='flex min-h-screen w-full'>
        
        {/* sidebar */}
        <div className='w-64 hidden lg:flex'>
          <AdminSidebar 
            open={openSideBar}
            setOpen={setOpenSideBar}  
          />
        </div>
        
        <div className='flex flex-1 flex-col'>
            {/* header */}
            <div className='h-14 z-40'>
              <AdminHeader setOpen={setOpenSideBar} />
            </div>
            
            <main className='w-full lg:w-[calc(100vw-16rem)] flex flex-1 flex-col bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout