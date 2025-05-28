import React from 'react'

// components
import AdminOrders from '@/components/admin/Orders'

const AdminOrdersView = () => {
  return (
    <div className='container mx-auto grid grid-cols-1 gap-8'>
        <AdminOrders/>
    </div>
  )
}

export default AdminOrdersView