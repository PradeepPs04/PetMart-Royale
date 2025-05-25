import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// redux store actions
import { setOrderDetails } from '@/store/shop/order-slice'

// shadcn ui componets
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Badge } from '../ui/badge'

// components
import ShoppingOrderDetailsView from './OrderDetails'

// APIs
import { getOrderDetails, getUserOrders } from '@/services/operations/orderAPI'

const ShoppingOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { orderList, orderDetails } = useSelector(state => state.order);

  // get order details
  const handleFetchOrderDetails = async (orderId) => {
    await getOrderDetails(orderId, dispatch);
  }

  // fetch all user orders
  useEffect(() => {
    const getAllUserOrders = async () => {
      await getUserOrders(user?.id, dispatch);
    }
    getAllUserOrders();
  }, [dispatch]);

  useEffect(() => {
    if(orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* list of orders */}
          <TableBody>
            { 
              orderList && orderList.length > 0 ? (
                orderList.map(orderItem => (
                  <TableRow key={orderItem._id}>
                    <TableCell>
                      {orderItem?._id}
                    </TableCell>

                    <TableCell>
                      {orderItem?.orderDate.split('T')[0]}
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={`py-1 px-3 ${orderItem?.orderStatus === 'confirmed' ? 'bg-green-500' : 
                      orderItem?.orderStatus === 'rejected' ? 'bg-red-600' : 'bg-black'}`}>
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      ₹{orderItem?.totalAmount}
                    </TableCell>

                    {/* view details button */}
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                           dispatch(setOrderDetails(null));
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem?._id)} 
                          className='cursor-pointer'
                        >
                          View Details
                        </Button>
                        
                        {/* order details dialog */}
                        <ShoppingOrderDetailsView
                          orderDetails={orderDetails}
                        />
                      </Dialog>

                    </TableCell>
                  </TableRow>
                ))
              ) : null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders