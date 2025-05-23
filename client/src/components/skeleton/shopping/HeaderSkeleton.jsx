import React from 'react'

const HeaderSkeleton = () => {
  return (
    <nav className="h-16 flex items-center animate-pulse justify-between space-x-4 border-b">
        {/* logo */}
        <div className="flex gap-1">
            <div className="h-6 w-28 bg-gray-200 rounded"></div>
        </div>

        {/* navigation items */}
        <div className="hidden lg:flex gap-4">
            <div className="h-4 w-10 rounded-full bg-gray-200"></div>
            <div className="h-4 w-16 rounded-full bg-gray-200"></div>
            <div className="h-4 w-10 rounded-full bg-gray-200"></div>
            <div className="h-4 w-10 rounded-full bg-gray-200"></div>
            <div className="h-4 w-12 rounded-full bg-gray-200"></div>
            <div className="h-4 w-10 rounded-full bg-gray-200"></div>
            <div className="h-4 w-14 rounded-full bg-gray-200"></div>
            <div className="h-4 w-14 rounded-full bg-gray-200"></div>
        </div>

        {/* cart and account */}
        <div className="flex items-center gap-2">
            {/* cart */}
            <div className="h-7 w-7 bg-gray-200 rounded"></div>

            {/* account */}
            <div className="hidden lg:flex h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
    </nav>

  )
}

export default HeaderSkeleton