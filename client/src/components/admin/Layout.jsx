import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

// components
import AdminHeader from './Header'
import AdminSidebar from './Sidebar'

const AdminLayout = () => {

  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className='flex min-h-screen w-full'>
        
        <AdminSidebar 
          open={openSideBar}
          setOpen={setOpenSideBar}  
        />
        
        <div className='flex flex-1 flex-col'>
            <AdminHeader
              setOpen={setOpenSideBar}
            />
            
            <main className='flex flex-1 flex-col bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout