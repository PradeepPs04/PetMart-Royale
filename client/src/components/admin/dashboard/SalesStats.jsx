import React from 'react'

// icons
import { BadgeIndianRupeeIcon, PiggyBankIcon, ShoppingBagIcon, ShoppingBasketIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

const SalesStats = ({salesData}) => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {/* monthly sales */}
        <div className='p-4 outline rounded'>
            {/* heading */}
            <div className='flex justify-between items-center'>
            <div>
                <p className='text-md font-semibold text-muted-foreground'>Total Revenue</p>
                <p className='text-xs font-semibold text-gray-400'>Last 30 Days</p>
            </div>

            <div className='p-2 rounded-full bg-[#dfffef]'>
                <BadgeIndianRupeeIcon className='text-[#20d647]'/>
            </div>

            </div>
            
            {/* stats */}
            <div className='mt-6 flex items-center justify-between'>
                <p className='font-bold text-2xl'>
                ₹{salesData.monthlySales}
                </p>

                <>
                    {
                    salesData.monthlySalesPercentageChange ? (
                        <>
                        {
                            // if profit
                            salesData.monthlySalesPercentageChange >= 0 ? (
                            <div className='text-[#20d647] bg-[#EAFEF4] font-semibold flex gap-2 items-center'>
                                <TrendingUpIcon/>
                                {salesData.monthlySalesPercentageChange}%
                            </div>
                            ) : (
                            // if loss
                            <div className='text-red-500 bg-[#FFEBE7] p-1 rounded font-semibold flex gap-2 items-center'>
                                <TrendingDownIcon/>
                                {salesData.monthlySalesPercentageChange}%
                            </div>
                            )
                        }
                        </>
                    ) : (
                        <div className='text-[#20d647] bg-[#dfffef] p-1 rounded font-semibold flex gap-2 items-center'>
                        <TrendingUpIcon/>
                        ₹{salesData?.monthlySales}
                        </div>
                    )
                    }
                </>
            </div>
        </div>

        {/* total sales */}
        <div className='p-4 outline rounded'>
            {/* heading */} 
            <div className='flex justify-between items-center'>
                <div>
                <p className='text-md font-semibold text-muted-foreground'>Total Revenue</p>
                <p className='text-xs font-semibold text-gray-400'>Overall</p>
                </div>
                
                <div className='p-2 rounded-full bg-[#dfffef]'>
                <PiggyBankIcon className='text-[#20d647]'/>
                </div>

            </div>
            
            {/* total count */}
            <div className='mt-6 flex items-center justify-between'>
                <p className='font-bold text-2xl'>
                ₹{salesData.totalSales}
                </p>
            </div>
        </div>

        {/* monthly orders */}
        <div className='p-4 outline rounded'>
            {/* heading */}
            <div className='flex justify-between items-center'>
                <div>
                <p className='text-md font-semibold text-muted-foreground'>Total Orders</p>
                <p className='text-xs font-semibold text-gray-400'>Last 30 Days</p>
                </div>

                <div className='p-2 rounded-full bg-[#E2EDF6]'>
                <ShoppingBasketIcon className='text-[#6cabd2]'/>
                </div>

            </div>
            
            {/* stats */}
            <div className='mt-6 flex items-center justify-between'>
                <p className='font-bold text-2xl'>
                {String(salesData.monthlyOrders).padStart(2,'0')}
                </p>

                <>
                    {
                    salesData.monthlyOrdersPercentageChange ? (
                        <>
                        {
                            // if profit
                            salesData.monthlyOrdersPercentageChange >= 0 ? (
                            <div className='text-[#20d647] bg-[#EAFEF4] font-semibold flex gap-2 items-center'>
                                <TrendingUpIcon/>
                                {salesData.monthlyOrdersPercentageChange}%
                            </div>
                            ) : (
                            // if loss
                            <div className='text-red-500 bg-[#FFEBE7] p-1 rounded font-semibold flex gap-2 items-center'>
                                <TrendingDownIcon/>
                                {salesData.monthlyOrdersPercentageChange}%
                            </div>
                            )
                        }
                        </>
                    ) : (
                        <div className='text-[#20d647] bg-[#dfffef] p-1 rounded font-semibold flex gap-2 items-center'>
                        <TrendingUpIcon/>
                        {salesData?.monthlyOrders} orders
                        </div>
                    )
                    }
                </>
            </div>
        </div>

        {/* total orders */}
        <div className='p-4 outline rounded'>
            {/* heading */}
            <div className='flex justify-between items-center'>
                <div>
                <p className='text-md font-semibold text-muted-foreground'>Total Orders</p>
                <p className='text-xs font-semibold text-gray-400'>Overall</p>
                </div>

                <div className='p-2 rounded-full bg-[#E2EDF6]'>
                <ShoppingBagIcon className='text-[#6cabd2]'/>
                </div>

            </div>
            
            {/* total count */}
            <div className='mt-6 flex items-center justify-between'>
                <p className='font-bold text-2xl'>
                {String(salesData.monthlyOrders).padStart(2,'0')}
                </p>
            </div>
        </div>  
    </section>
  )
}

export default SalesStats