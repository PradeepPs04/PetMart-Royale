import React from 'react'

// images
import accImg from '../../assets/account.jpg'

// shadcn ui components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// components
import ShoppingOrders from '@/components/shopping/Orders'
import Address from '@/components/shopping/Address'

const ShoppingAccount = () => {
  return (
    <div className='flex flex-col'>

      {/* banner images */}
      <div className='relative h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-full overflow-hidden'>
        <img
          src={accImg}
          loading='lazy'
          className='h-full w-full object-cover object-center'
        />
      </div>

      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue='orders'>

            {/* tab options */}
            <TabsList>
              <TabsTrigger
                value='orders'
                className='cursor-pointer'
              >
                Orders
              </TabsTrigger>

              <TabsTrigger
                value='address'
                className='cursor-pointer'
              >
                Address
              </TabsTrigger>
            </TabsList>

            <TabsContent value='orders'>
              <ShoppingOrders/>
            </TabsContent>

            <TabsContent value='address'>
              <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>

    </div>
  )
}

export default ShoppingAccount