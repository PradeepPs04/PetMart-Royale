import React from "react";

const ProductsSekeleton = () => {
  return (
    <div class="animate-pulse">
      {/* add product button */}
      <div class="mb-5 flex justify-end">
        <div class="h-10 bg-gray-200 w-40 rounded-md"></div>
      </div>

      {/* products */}
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
            Array(12).fill().map((_, idx) => (
                <div key={idx} class="h-[520px] outline rounded-lg">
                    {/* image */}
                    <div className="w-full h-[61%] bg-gray-200"></div>

                    {/* name */}
                    <div className="mt-5 px-6">
                        <p className="w-full h-10 rounded bg-gray-200"></p>
                    </div>

                    {/* price */}
                    <div className="mt-11 px-6 flex justify-between">
                        <div className="h-7 w-10 rounded bg-gray-200"></div>
                        <div className="h-7 w-10 rounded bg-gray-200"></div>
                    </div>

                    {/* buttons */}
                    <div className="mt-4 px-6 flex justify-between">
                        <div className="h-10 w-15 rounded-md bg-gray-200"></div>
                        <div className="h-10 w-[4.5rem] rounded-md bg-gray-200"></div>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default ProductsSekeleton;
