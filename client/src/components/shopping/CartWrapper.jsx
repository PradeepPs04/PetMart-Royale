import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// shadcn ui components
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'

// components
import UserCartContent from './CartContent';

// skeleton loader component
import CartSkeleton from '../skeleton/shopping/CartSkeleton';

const UserCartWrapper = ({cartItems, setOpenCartSheet}) => {

    const { user } = useSelector(state => state.auth);
    const { isLoading } = useSelector(state => state.shopCart);
    
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
        {/* heading */}
        <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {/* cart items */}
        <div className='mt-8 space-y-4 max-h-[60vh] overflow-auto p-2'>
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
                disabled={cartItems?.length > 0 ? false : true}
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