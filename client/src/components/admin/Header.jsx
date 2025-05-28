import React from 'react'
import { useDispatch } from 'react-redux'

// shadcn ui components
import { Button } from '../ui/button'

// icons
import { AlignJustify, LogOut } from 'lucide-react'

// APIs
import { logout } from '@/services/operations/authAPI'

const AdminHeader = ({setOpen}) => {

  const dispatch = useDispatch();

  return (
    <header className='fixed w-full lg:w-[calc(100vw-16rem)] flex items-center justify-between px-4 py-3 bg-background border-b'>
      {/* side menubar toggle button */}
      <Button 
        onClick={() => setOpen(prev => !prev)}
        className='lg:hidden sm:block cursor-pointer'
      >
        {/* ham-burger icon */}
        <AlignJustify />
        <span className='sr-only'>Toggle Menu</span>
      </Button>

      {/* logout button */}
      <div className='flex flex-1 justify-end'>
        <Button 
          onClick={async () => await logout(dispatch)}
          className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer'
        >
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader