import React from "react";

const FeaturesSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-6 animate-pulse">
      {/* heading */}
      <div className="w-full mt-5">
        <h2 className=" w-[120px] h-6 bg-gray-200 rounded"></h2>
      </div>

      {/* image upload container */}
      <div className="w-full -mt-4">
        <div className="border-2 border-dashed rounded-lg p-4">
          <div className="h-56 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* upload button */}
      <div className="h-10 w-[80px] bg-gray-200 rounded-md"></div>

      {/* seperator */}
      <div className="w-full h-px bg-gray-200"></div>

      {/* feature images */}
      <div className="flex flex-col gap-4 w-full mt-3">
        {/* image 1 */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-4/5 mx-auto h-96 bg-gray-200 rounded-lg"></div>
          {/* delete button */}
          <div className="bg-red-500 h-9 rounded-md w-[75px]"></div>
        </div>

        {/* image 2 */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-4/5 mx-auto h-96 bg-gray-200 rounded-lg"></div>
          {/* delete button */}
          <div className="bg-red-500 h-9 rounded-md w-[75px]"></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSkeleton;
