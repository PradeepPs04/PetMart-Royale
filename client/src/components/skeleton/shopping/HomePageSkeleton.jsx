import { Card, CardContent } from '@/components/ui/card';
import React from 'react'

// data for category cards
const categories = [
  { id: "cats", label: "cats" },
  { id: "dogs", label: "Dogs" },
  { id: "birds", label: "Birds" },
  { id: "toys", label: "Toys" },
  { id: "beds&cages", label: "Toys" },
];

// data for brand cards
const brands = [
  { id: "pedigree", label: "Pedigree" },
  { id: "himalaya", label: "Himalaya" },
  { id: "active", label: "Active" },
  { id: "purepet", label: "Purepet" },
  { id: "whiskas", label: "Whiskas" },
  { id: "royal-canin", label: "Royal Canin" },
];

const HomePageSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">

        {/* image banners */}
        <section className="w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200"></section>

        {/* shop by category cards */}
        <section className='py-12 bg-gray-50'>
            <div className='container mx-auto px-4'>
            {/* heading */}
            <h2 className='mx-auto mb-8 bg-gray-200 w-[16rem] h-10 rounded'></h2>

            {/* cards */}
            <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                {
                    categories.map((item) => (
                        <Card key={item.id} className='bg-gray-200 h-[11.5rem]'></Card>
                    ))
                }
            </div>
            </div>
        </section>

        {/* products cards */}
        <section className='py-12'>
            {/* heading */}
            <h2 className='mx-auto mb-8 bg-gray-200 w-[15rem] h-10 rounded'></h2>
            
            {/* cards */}
            <div className='px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
                
                Array(4).fill().map((_, idx) => (
                    <div 
                        key={idx}
                        className='h-[560px] rounded-xl max-w-sm bg-gray-200'
                    >
                    </div>
                ))
            }
            </div>
        </section>

        {/* shop by brand cards */}
        <section className='py-12 bg-gray-50'>
            <div className='container mx-auto px-4'>
                {/* heading */}
                <h2 className='mx-auto mb-8 bg-gray-200 w-[16rem] h-10 rounded'></h2>

                {/* cards */}
                <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                {
                    brands.map((item) => (
                        <Card key={item.id} className='bg-gray-200 h-[11.5rem]'></Card>
                    ))
                }
                </div>
            </div>
        </section>

    </div>
  )
}

export default HomePageSkeleton