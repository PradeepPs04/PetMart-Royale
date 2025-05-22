import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// shadcn ui components
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'

// components
import CommonForm from '../common/Form'
import { getAllOrders, updateOrderStatus } from '@/services/operations/adminAPIs'
import { setOrderDetails } from '@/store/admin/order-slice'

// config data
const initialFormData = {status: ''};
const statusFormControls = [
    {
        label: 'Order Status',
        name: 'status',
        componentType: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'inProcess', label: 'In Process' },
            { id: 'inShipping', label: 'In Shipping' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'rejected', label: 'Rejected' },
        ]
    }
]

const AdminOrderDetailsView = ({orderDetails}) => {
    
    const [formData, setFormData] = useState(initialFormData);
    
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // function to update order status
    const handleUpdateStatus = (e) => {
        e.preventDefault();

        const {status} = formData;

        // update order status
        updateOrderStatus(orderDetails?._id, status, dispatch).then(result => {
            if(result) {
                console.log("result is: ", result);
                // set order details in store
                dispatch(setOrderDetails(result));
                // fetch all orders
                getAllOrders(dispatch);
            }
        });
    }

    return(
        <DialogContent className='sm:max-w-[600px] h-[95%] overflow-y-auto'>
            <div className='grid gap-6'>
                {/* order details */}
                <div className='grid gap-2'>
                    {/* order id */}
                    <div className='mt-6 flex items-center justify-between'>
                        <p className='font-medium'>Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>

                    {/* order date */}
                    <div className='mt-2 flex items-center justify-between'>
                        <p className='font-medium'>Order Date</p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>

                    {/* order price */}
                    <div className='mt-2 flex items-center justify-between'>
                        <p className='font-medium'>Order Price</p>
                        <Label>₹{orderDetails?.totalAmount}</Label>
                    </div>

                    {/* Payment method */}
                    <div className='mt-2 flex items-center justify-between'>
                        <p className='font-medium'>Payment Method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>

                    {/* Payment status */}
                    <div className='mt-2 flex items-center justify-between'>
                        <p className='font-medium'>Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>

                    {/* order status */}
                    <div className='mt-2 flex items-center justify-between'>
                        <p className='font-medium'>Order Status</p>
                        <Label>
                            <Badge className={`py-1 px-3 ${orderDetails ?.orderStatus === 'confirmed' ? 'bg-green-500' : 
                      orderDetails ?.orderStatus === 'rejected' ? 'bg-red-600' : 'bg-black'}`}>
                        {orderDetails?.orderStatus}
                      </Badge>
                        </Label>
                    </div>
                </div>

                <Separator/>
                
                {/* ordered items details */}
                <div className='gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>Order Details</div>

                        <ul className='grid gap-3'>
                            {
                                orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
                                   orderDetails?.cartItems.map(item => (
                                    <li className='flex items-center justify-between'>
                                        <span>{item?.title}</span>

                                        <span>Quantity: {item?.quantity}</span>

                                        <span>Price: ₹{item?.price}</span>
                                    </li>
                                   )) 
                                ) : null
                            }
                        </ul>
                    </div>
                </div>
                
                {/* shipping details */}
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>Shipping Info</div>

                        <div className='grid gap-0.5 text-muted-foreground'>
                            <span>Name: {user?.userName}</span>

                            <span>Address: {orderDetails?.addressInfo?.address}</span>

                            <span>City: {orderDetails?.addressInfo?.city}</span>

                            <span>Pin Code: {orderDetails?.addressInfo?.pincode}</span>

                            <span>Phone Number: {orderDetails?.addressInfo?.phone}</span>
                        </div>
                    </div>
                </div>

                {/* order status update form */}
                <div>
                    <CommonForm
                        formControls={statusFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText='Update Order Status'
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    )
}

export default AdminOrderDetailsView