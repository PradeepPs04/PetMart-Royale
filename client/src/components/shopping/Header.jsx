import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// shadcn ui components
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Label } from '../ui/label'

// icons
import { LogInIcon, LogOut, Menu, ShoppingCart, UserCog, UserIcon } from 'lucide-react'
import LogoIcon from '../../assets/logo.png'

// config data
import { shoppingMenuItems } from '@/config/userShop'
import { logout } from '@/services/operations/authAPI'

// components
import UserCartWrapper from './CartWrapper'

// APIs
import { fetchCartItems } from '@/services/operations/shopAPIs'


// menu bar component
const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // get current active nav link (for styling)
  let currentActiveNavLink = searchParams.get('category') ? searchParams.get('category') : location.pathname.split('/').at(-1);
  if(currentActiveNavLink === 'listing') {
    currentActiveNavLink = 'products';
  }

  // go to selected menu item page
  const handleNavigate = (item) => {
    // remove previously selected filters (if any)
    sessionStorage.removeItem('filters');
    const currentFilter = item.id !== 'home' && item.id !== 'products' && item.id !== 'search' ? {
      category: [item.id]
    }
    : null;

    // set new filter
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));

    location.pathname.includes('listing') && currentFilter !== null ? setSearchParams(new URLSearchParams(`?category=${item.id}`)) : navigate(item.path);
  }

  return (
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {
        shoppingMenuItems.map((item) => (
          <Label 
            key={item.id}
            onClick={() => handleNavigate(item)}
            className={`text-sm font-medium cursor-pointer hover:text-black/60 transition-colors duration-200
              ${currentActiveNavLink === item.id ? 'text-black/60' : ''}
            `}
          >
            {item.label}
          </Label>
        ))
      }
    </nav>
  )
}

// account options dropdown
const HeaderRightContent = () => {

  const {user} = useSelector((state) => state.auth);
    const {cartItems} = useSelector((state) => state.shopCart);
  

  const [openCartSheet, setOpenCartSheet] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleGuestLogin = async () => {
    const isGuest = true;
    // logout guest account and redirect to login page
    await logout(dispatch, isGuest);
  }

  // fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      await fetchCartItems(dispatch);
    }
    fetchCart();
  }, [dispatch]);

  return (
    <div className='flex flex-col lg:items-center lg:flex-row gap-4'>

      {/* cart button & cart modal */}
      <Sheet 
        open={openCartSheet}
        onOpenChange={() => setOpenCartSheet(false)}
      >
        <Button
          variant='outline'
          size='icon'
          onClick={() => setOpenCartSheet(true)}
          className='relative cursor-pointer'
        >
          <ShoppingCart className='w-6 h-6'/>
          <span className='absolute top-[-5px] right-[2px] text-sm font-bold'>{cartItems?.length}</span>
          <span className='sr-only'>User cart</span>
        </Button>

        <UserCartWrapper 
          cartItems={cartItems}
          setOpenCartSheet={setOpenCartSheet}
        />
      </Sheet>

      {/* user account dropdown menu */}
       <DropdownMenu>
        {/* button to open account options dropdown */}
        <DropdownMenuTrigger asChild>
          <Avatar className='bg-black select-none cursor-pointer'>
            <AvatarFallback className='bg-black text-white font-extrabold'>
              <UserIcon size={20}/>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        {/* dropdown options */}
        <DropdownMenuContent side='right' className='w-56'>
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
            {
              user?.role === 'guest' ? (
                <>
                    {/* Login */}
                    <DropdownMenuItem 
                      onClick={handleGuestLogin}
                      className='cursor-pointer'
                    >
                      <LogInIcon className='mr-2 h-4 w-4'/>
                      Login
                    </DropdownMenuItem>
                </>
              ) : (
                <>
                    {/* account */}
                    <DropdownMenuItem 
                      onClick={() => navigate('/shop/account')}
                      className='cursor-pointer'
                    >
                      <UserCog className='mr-2 h-4 w-4'/>
                      Account
                    </DropdownMenuItem>

                    {/* logout */}
                    <DropdownMenuItem 
                      onClick={async () => await logout(dispatch)}
                      className='cursor-pointer'
                    >
                      <LogOut className='mr-2 h-4 w-4'/>
                      Logout
                    </DropdownMenuItem>
                </>
              )  
            }
          <DropdownMenuSeparator/>

          
        </DropdownMenuContent>
       </DropdownMenu>
    </div>
  )
}

const ShoppingHeader = ( ) => {

  return (
    <header className='fixed top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center gap-2'>
        <img
          src={LogoIcon}
          className='h-6 w-6'
        />
          <span className='font-bold'>Petmart Royle</span>
        </Link>

        {/* menu bar for smaller screens */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='lg:hidden'
            >
              <Menu className='h-6 w-6'/>
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side='left' className='w-full max-w-xs p-4'>
            {/* menu items */}
              <MenuItems/> 

            {/* account options */}
            <HeaderRightContent/>
          </SheetContent>
        </Sheet>

        {/* menu bar for larger screens */}
        <div className='hidden lg:block'>
          <MenuItems/>
        </div>

        {/* account options */}
        <div className='hidden lg:block'>
          <HeaderRightContent/>
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader