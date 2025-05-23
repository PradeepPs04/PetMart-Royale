import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// shadcn ui components
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'

// components
import UserCartContent from './CartContent';
import { toast } from 'react-toastify';

const UserCartWrapper = ({cartItems, setOpenCartSheet}) => {

    const { user } = useSelector(state => state.auth);
    
    const navigate = useNavigate();

    // calculate total cart amount
    const totalCartAmount = cartItems &&
        cartItems.length > 0 ?
        cartItems.reduce(
            (sum, curr) => 
                sum + 
                    (curr?.salePrice > 0 
                        ? curr?.salePrice 
                        : curr?.price) * 
                        curr?.quantity,
                        0
                    )
        : 0;
    
    // function to go to checkout page
    const handleNavigateToCheckout = () => {
        if(user?.role === 'guest') {
            toast.error("Please login to continue!", {position: 'top-center'});
            return;
        }
        navigate('/shop/checkout');
        setOpenCartSheet(false);
    }

  return (
    <SheetContent className='sm:max-w-md'>
        <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {/* cart items */}
        <div className='mt-8 space-y-4'>
            {
                cartItems && cartItems?.length > 0 && cartItems.map((item, idx) => (
                    <UserCartContent key={idx} cartItem={item}/>
                ))
            }
        </div>

        {/* total cart price */}
        <div className='px-4 mt-8 space-y-4'>
            <div className='flex justify-between'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>₹{totalCartAmount}</span>
            </div>
        </div>
        
        {/* checkout button */}
        <div className='px-4'>
            <Button 
                onClick={handleNavigateToCheckout}
                className='w-full mt-6 cursor-pointer'
            >
                Checkout
            </Button>
        </div>
    </SheetContent>
  )
}

export default UserCartWrapper