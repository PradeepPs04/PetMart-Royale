import React from "react";
import { useLocation } from "react-router-dom";

const AddressSkeleton = () => {
  const location = useLocation();

  return (
    <div className="animate-pulse outline rounded-lg">

      {/* heading only for checkout page */}
      {
          location.pathname.split('/').at(-1) === 'checkout' && (
              <div className='px-6 mt-7 -mb-5'>
                  <h3 className='w-52 h-5 bg-gray-300 rounded'></h3>
              </div>
          )
      }

      {/* address */}
      <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 mb-5">
        {
            Array(2).fill().map((_,idx) => (
              <div key={idx} className="bg-gray-200 py-11 px-4 rounded-xl">
                {/* address */}
                <div className="flex flex-col gap-4">
                    <p className="h-4 w-1/2 bg-gray-300 rounded"></p>
                    <p className="h-4 w-1/6 bg-gray-300 rounded"></p>
                    <p className="h-4 w-1/6 bg-gray-300 rounded"></p>
                    <p className="h-4 w-1/4 bg-gray-300 rounded"></p>
                </div>

                {/* buttons */}
                <div className="mt-12 h-4 flex justify-between">
                  <div className="h-8 w-16 bg-gray-300 rounded-md"></div>
                  <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
                </div>
              </div>
            ))
        }
      </div>
        
        {/* address form only for accout page */}
        {
          location.pathname.split('/').at(-1) === 'account' && (
            <div className="mt-12 px-6">
              {/* heading */}
              <div className="h-4 w-32 rounded bg-gray-300"></div>

              {/* form */}
              <div className="mt-4 py-4 flex flex-col gap-3">
                {/* input fileds */}
                {
                  Array(4).fill().map((_, idx) => (
                    <div className='grid w-full gap-1.5'>
                      <div className="w-10 h-4 rounded bg-gray-300"></div>
                      <div className="w-full h-9 rounded-lg bg-gray-300"></div>
                    </div>
                  ))
                }

                {/* button */}
                <div className="w-full h-9 rounded-lg bg-gray-300"></div>
              </div>
            </div>
          )
        }
    </div>
  );
};

export default AddressSkeleton;
