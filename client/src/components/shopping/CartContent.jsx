import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// shadcn ui components
import { Button } from '../ui/button'

// icons
import { Minus, Plus, Trash } from 'lucide-react'

// APIs
import { deleteFromCart, updateCartItem } from '@/services/operations/shopAPIs'

const UserCartContent = ({cartItem}) => {

  const dispatch = useDispatch();

  const { cartItems } = useSelector(state => state.shopCart);
  const { products } = useSelector((state) => state.shopProducts);

  // delete cart item
  const handleCartItemDelete = async (cartItem) => {
    await deleteFromCart(cartItem?.productId, dispatch);
  }

  const handleUpdateQuantity = async (cartItem, type) => {
    if(type === 'plus') {
      let getCartItems = cartItems || [];
  
        if(getCartItems.length) {
          const indexOfCurrentCartItem = getCartItems.findIndex(item => item.productId === cartItem.productId);
  
          const getCurrentProductIndex = products.findIndex(product => product._id === cartItem.productId);
          const getTotalStock = products[getCurrentProductIndex].totalStock;

          if(indexOfCurrentCartItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;

            if(getQuantity + 1 > getTotalStock) {
              toast.error(`Only ${getQuantity} quantity can be added for this item`);
              return;
            }
          }
      }
  }

    // increase quantity by 1
    if(type === 'plus') {
      const data = {
        productId: cartItem.productId,
        quantity: cartItem.quantity + 1,
      }
      await updateCartItem(data, dispatch);
    } else { // decrease quantity by 1
        const data = {
          productId: cartItem.productId,
          quantity: cartItem.quantity - 1,
        }
        await updateCartItem(data, dispatch);
      }
    }

  return (
    <div className='flex items-center space-x-4 p-4'>
        <img 
          src={cartItem?.image}
          alt={cartItem?.title}
          loading='lazy'
          className='h-20 w-20 rounded object-cover'
        />
        
        {/* item name & action buttons */}
        <div className='flex-1'>
          <h3 className='font-bold'>
            {cartItem?.title}
          </h3>

            {/* buttons */}
            <div className='flex items-center gap-2 mt-1'>
              {/* plus */}
              <Button
                disabled={cartItem?.quantity === 1} // disable when there only 1 item
                onClick={() => handleUpdateQuantity(cartItem, 'minus')}
                variant='outline'
                size='icon'
                className='h-8 w-8 rounded-full cursor-pointer'
              >
                <Minus className='w-4 h-4'/>
                <span className='sr-only'>Decrease</span>
              </Button>

              {/* item quantity */}
              <span className='font-semibold'>{cartItem?.quantity}</span>

              {/* minus */}
              <Button
                onClick={() => handleUpdateQuantity(cartItem, 'plus')}
                variant='outline'
                size='icon'
                className='h-8 w-8 rounded-full cursor-pointer'
              >
                <Plus className='w-4 h-4'/>
                <span className='sr-only'>Increase</span>
              </Button>
            </div>
        </div>

        {/* item total price & delete button */}
        <div className='flex flex-col items-end'>
          <p className='font-semibold'>
            ₹{((cartItem?.salePrice > 0
              ? cartItem?.salePrice
              : cartItem?.price)
              * cartItem?.quantity).toFixed(2)}
          </p>
          
          {/* delete button */}
          <Trash 
            onClick={() => handleCartItemDelete(cartItem)}
            className='cursor-pointer mt-1' 
            size={20}
          />
        </div>
    </div>
  )
}

export default UserCartContent