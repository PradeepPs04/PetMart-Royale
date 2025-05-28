import React from "react";

const DasboardSkeleton = () => {
  return (
    <>
      {/* sales stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 -ml-4">
        {/* monthly sales */}
        <div className="p-4 outline rounded animate-pulse">
          {/* heading */}
          <div className="flex justify-between items-center">
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="p-2 rounded-full bg-gray-200">
              <div className="h-5 w-5 rounded"></div>
            </div>
          </div>

          {/* stats */}
          <div className="mt-6 flex items-center justify-between">
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* total sales */}
        <div className="p-4 outline rounded animate-pulse">
          {/* heading */}
          <div className="flex justify-between items-center">
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="p-2 rounded-full bg-gray-200">
              <div className="h-5 w-5 rounded"></div>
            </div>
          </div>

          {/* stats */}
          <div className="mt-6 flex items-center justify-between">
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* monthly orders */}
        <div className="p-4 outline rounded animate-pulse">
          {/* heading */}
          <div className="flex justify-between items-center">
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="p-2 rounded-full bg-gray-200">
              <div className="h-5 w-5 rounded"></div>
            </div>
          </div>

          {/* stats */}
          <div className="mt-6 flex items-center justify-between">
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* total orders */}
        <div className="p-4 outline rounded animate-pulse">
          {/* heading */}
          <div className="flex justify-between items-center">
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="p-2 rounded-full bg-gray-200">
              <div className="h-5 w-5 rounded"></div>
            </div>
          </div>

          {/* stats */}
          <div className="mt-6 flex items-center justify-between">
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>

      {/* pie charts */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(2)
          .fill()
          .map((_, idx) => (
            <div key={idx} className="mt-8 outline rounded-lg p-4 animate-pulse">
              {/* heading */}
              <div className="mt-3 h-6 bg-gray-200 text-center w-1/2 mx-auto rounded"></div>

              {/* pie charts */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/*  sales count for each category */}
                <div className="p-6 outline rounded-md">
                  <div className="mx-auto aspect-square max-h-[250px] flex flex-col items-center justify-center">
                    <div className="mt-8 h-44 w-44 rounded-full bg-gray-200"></div>
                  </div>

                  <div className="mt-6 mb-2 h-8 text-center bg-gray-200 w-full rounded"></div>
                </div>

                {/* revenue for each category */}
                <div className="p-6 outline rounded-md">
                  <div className="mx-auto aspect-square max-h-[250px] flex flex-col items-center justify-center">
                    <div className="mt-8 h-44 w-44 rounded-full bg-gray-200"></div>
                  </div>

                  <div className="mt-6 mb-2 h-8 text-center bg-gray-200 w-full rounded"></div>
                </div>
              </div>
            </div>
          ))}

        {/* sales by brands */}
      </section>

      {/* top selling products */}
      <section className="mt-12 p-4 outline rounded-lg lg:w-full animate-pulse">
        {/* heading */}
        <div className="h-6 bg-gray-200 rounded w-1/5 mt-4"></div>

        {/* product cards */}
        <div className="mt-6 w-[89vw] md:w-[80vw] lg:w-full overflow-hidden py-4">
          <div className="mt-4 flex gap-6">
            {
              Array(5).fill().map((_, idx) => (
                <div key={idx} className='flex justify-center items-center min-w-[250px] animate-pulse'>
                  <div className='w-full outline ml-px rounded-lg p-1'>
                    {/* image */}
                    <div className='mt-10 h-[150px] w-full bg-gray-200 rounded-lg'></div>
                    
                    {/* product details */}
                    <div className="px-4">
                      {/* name */}
                      <div className='my-2 h-8 w-full bg-gray-200 rounded '></div>
                      {/* price */}
                      <div className='mt-14 mb-13 flex justify-between items-center'>
                        <span className='h-5 bg-gray-200 rounded w-1/4'></span>
                        <span className='h-5 bg-gray-200 rounded w-1/4'></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default DasboardSkeleton;
