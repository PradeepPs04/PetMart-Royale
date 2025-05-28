import React from "react";

const CartSkeleton = () => {
  return (
    <div className="animate-pulse mt-8">
      {/* cart items */}
      <div>
        {Array(3)
          .fill()
          .map((_, idx) => (
            <div key={idx} className="space-y-4 max-h-[60vh] overflow-auto p-2">
              <div className="flex items-center space-x-4 p-4 outline rounded-lg">
                {/* image */}
                <div className="h-20 w-20 rounded object-cover bg-gray-300"></div>

                {/* name & action buttons */}
                <div className="flex-1">
                  <p className="h-10 w-full rounded bg-gray-300"></p>

                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                    <p className="h-6 w-6 bg-gray-300 rounded"></p>
                    <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  </div>
                </div>

                {/* price and delete button */}
                <div className="flex flex-col items-end">
                  <p className="h-6 w-8 rounded bg-gray-300"></p>
                  <div className="mt-1 h-6 w-6 rounded bg-gray-300"></div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* total price */}
      <div className="mt-28 flex justify-between px-4 space-y-4">
        <p className="h-6 w-12 rounded bg-gray-300"></p>
        <p className="h-6 w-12 rounded bg-gray-300"></p>
      </div>

      {/* add to cart button */}
      <div className="mt-6 px-4">
        <div className="h-9 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default CartSkeleton;
