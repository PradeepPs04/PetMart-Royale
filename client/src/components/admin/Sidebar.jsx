import React, { Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// icons
import { LayoutDashboard, ShoppingBasket, Truck, ChartNoAxesCombined, ImagePlusIcon } from "lucide-react"

// shadcn ui components
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'


// items for admin side bar
export const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard/>,
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket/>,
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <Truck/>,
    },
    {
      id: 'features',
      label: 'Features',
      path: '/admin/features',
      icon: <ImagePlusIcon/>,
    },
];

const MenuItems = ({setOpen}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split('/').at(-1);

  return (
    <nav className='mt-8 flex flex-col gap-2'>
      {
        adminSidebarMenuItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setOpen ? setOpen(false) : null;
              }}
              className={`${currentPath === item.id ? 'bg-muted outline-1' : ''}
              flex items-center gap-2 text-lg rounded-md px-3 py-2 text-muted-foreground hover:bg-muted cursor-pointer transition-colors duration-200`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
        ))
      }
    </nav>
  )
}


const AdminSidebar = ({open, setOpen}) => {

  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet 
        open={open} 
        onOpenChange={setOpen}
      >
        <SheetContent side="left" className='w-64'>
          <div className='flex flex-col h-full'>
            <SheetHeader className='border-b'>
              <SheetTitle className='flex gap-2 items-center my-5'>
                <ChartNoAxesCombined size={30}/>
                <span className='text-xl font-extrabold'>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>

      <aside className='hidden w-64 fixed z-[50] h-full flex-col border-r bg-background p-6 lg:flex'>
        <div 
          onClick={() => navigate('/admin/dashboard')} 
          className='flex items-center gap-2 cursor-pointer'
        >
          <ChartNoAxesCombined size={30}/>
          <h1 className='text-xl font-extrabold'>Admin Panel</h1>
        </div>

        <MenuItems/>

      </aside>
    </Fragment>
  )
}

export default AdminSidebar