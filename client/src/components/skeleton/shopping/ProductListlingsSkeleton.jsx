import React from 'react'

const category = [
    { id: 'dogs', label: 'Dogs' },
    { id: 'cats', label: 'Cats' },
    { id: 'birds', label: 'Birds' },
    { id: 'fish&aquatic', label: 'Fish & Aquatic' },
    { id: 'toys', label: 'Toys & Accessories' },
    { id: 'grooming', label: 'Grooming Products' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'beds&cages', label: 'Beds & Cages' },
];

const brand = [
{ id: "pedigree", label: "Pedigree" },
{ id: "whiskas", label: "Whiskas" },
{ id: "active", label: "Active" },
{ id: "royal-canin", label: "Royal Canin" },
{ id: "himalaya", label: "Himalaya Pets" },
{ id: "purepet", label: "Purepet" },
{ id: "others", label: "Others" },
];

const ProductListlingsSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 animate-pulse'>

        {/* filters*/}
        <div className='bg-gray-200 rounded-lg shadow-sm'>
            {/* heading */}
            <div className='mt-2 p-4 border-b'>
                <div className='h-4 bg-gray-300 rounded w-1/4'></div>
            </div>
            
            {/* separator line */}
            <div className='mx-4'>
                <div className='h-px w-full bg-gray-300'></div>
            </div>

            {/* category filter options  */}
            <div className='p-4 space-y-4'>
                <div>
                    <div className='mt-2 h-4 bg-gray-300 rounded w-1/4'></div>
                    <div className='mt-2 flex flex-col gap-2'>
                        {
                            category.map(item => (
                                <div key={item.id} className='flex gap-2'>
                                    <div className='w-5 h-4 rounded bg-gray-300'></div>
                                    <div style={{width: `${item.label.length*0.4}rem`}} className={`h-4 bg-gray-300 rounded`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* separator line */}
            <div className='mx-4'>
                <div className='h-px w-full bg-gray-300'></div>
            </div>

            {/* brand filter options */}
            <div className='p-4 space-y-4'>
                <div>
                    <div className='mt-2 h-4 bg-gray-300 rounded w-1/6'></div>
                    <div className='mt-2 flex flex-col gap-2'>
                        {
                            brand.map(item => (
                                <div key={item.id} className='flex gap-2'>
                                    <div className='w-5 h-4 rounded bg-gray-300'></div>
                                    <div style={{width: `${item.label.length*0.4}rem`}} className={`h-4 bg-gray-300 rounded`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

        {/* products */}
        <div className='w-full rounded-lg shadow-sm'>
            <div className='p-4 border-b flex justify-between items-center '>
                <div className='h-4 bg-gray-300 rounded w-28'></div>

                {/* <!-- product count & sort by filter--> */}
                <div className='flex items-center gap-3'>
                    {/* <!-- no. of products --> */}
                    <div className='h-4 bg-gray-300 rounded w-20'></div>

                    {/* <!-- sort by dropdown --> */}
                    <div className='h-8 bg-gray-300 rounded w-[5.5rem]'></div>
                </div>

            </div>

            {/* separator line */}
            <div className='h-px w-full bg-gray-200'></div>
            
            {/* product cards */}
            <div className='mt-3 px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
                
                Array(12).fill().map((_, idx) => (
                    <div 
                        key={idx}
                        className='w-full max-w-sm mx-auto bg-gray-200 h-[560px] rounded-lg'
                    >   
                        {/* image */}
                        <div className='w-full h-[300px] object-cover rounded-t-lg'></div>

                        {/* product details */}
                        <div className='p-4'>
                            {/* name */}
                            <div className='mt-8'>
                                <p className='h-4 w-full bg-gray-300 rounded'></p>
                                <p className='mt-px h-4 w-1/2 bg-gray-300 rounded'></p>
                            </div>

                            {/* category & brand */}
                            <div className='flex justify-between mt-8'>
                                <p className='h-4 w-10 bg-gray-300 rounded'></p>
                                <p className='h-4 w-16 bg-gray-300 rounded'></p>
                            </div>

                            {/* price */}
                            <div className='flex justify-between mt-4'>
                                <p className='h-4 w-8 bg-gray-300 rounded'></p>
                                <p className='h-4 w-8 bg-gray-300 rounded'></p>
                            </div>
                        </div>

                        {/* add to cart button */}
                        <div className='mt-8 px-5 w-full'>
                            <div className='h-10 w-full bg-gray-300 rounded-md'></div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default ProductListlingsSkeleton