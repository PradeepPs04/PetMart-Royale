import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// images
import accImg from '../../assets/account.jpg'

// shadcn ui components
import { Button } from '@/components/ui/button'

// components
import Address from '@/components/shopping/Address'
import UserCartContent from '@/components/shopping/CartContent'

// skeleton components
import CartSkeleton from '@/components/skeleton/shopping/CartSkeleton'

// APIs
import { createOrder } from '@/services/operations/orderAPI'

const ShoppingCheckout = () => {

  const { isLoading, cartId, cartItems } = useSelector(state => state.shopCart);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

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
      ) : 0;


  // function to buy cart items
  const handleCheckout = async () => {
    if(cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if(currentSelectedAddress === null) {
      toast.error("Please select one address to proceed");
      return;
    }

    // create order data
    const orderData = {
      userId: user?.id,
      cartId: cartId,
      cartItems: cartItems?.map(item => ({
          productId: item?.productId,
          title: item?.title,
          brand: item?.brand,
          category: item?.category,
          image: item?.image,
          price: item?.salePrice > 0 ? item?.salePrice : item?.price,
          quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
      },
      orderStatus: 'pending',
      paymentMethod: 'razorpay',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
    }

    // call create order api
    await createOrder(orderData, user, dispatch, navigate);
  }

  console.log(cartItems);

  return (
    <div className='flex flex-col'>
        {/* banner image */}
        <div className='relative h-[300px] overflow-hidden'>
          <img
            src={accImg}
            loading='lazy'
            className='h-full w-full object-cover object-center'
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>

          {/* addresses */}
            <Address
              currentSelectedAddress={currentSelectedAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />

          {/* skeleton loader or cart items */}
          {
            isLoading ? (
              <div className='-mt-10 -mx-2'>
                <CartSkeleton/>
              </div>
            ) : (
              <div className='flex flex-col gap-4'>
                {
                  cartItems && cartItems.length > 0 ? (
                    cartItems.map(item => (
                      <UserCartContent
                        key={item.productId}
                        cartItem={item}
                      />
                    ))
                  ) : null
                }

                {/* total cart price */}
                <div className='px-4 mt-8 space-y-4'>
                    <div className='flex justify-between text-lg'>
                        <span className='font-black'>Total</span>
                        <span className='font-black'>₹{totalCartAmount}</span>
                    </div>
                </div>
                
                {/* Checkout button */}
                <div className='mt-4 w-full'>
                  {
                    cartItems?.length > 0 ? (
                      <Button 
                        onClick={handleCheckout}
                        className='cursor-pointer w-full'
                      >
                        Checkout
                      </Button>
                    ) : (
                      <Button 
                        disabled={true} 
                        className='w-full'
                      >
                        You cart is empty
                      </Button>
                    )
                  }
                </div>
              </div>
            )
          }

        </div>
    </div>
  )
}

export default ShoppingCheckout