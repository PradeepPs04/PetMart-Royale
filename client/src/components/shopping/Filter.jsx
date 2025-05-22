import React, { Fragment } from 'react'

// config data
import { filterOptions } from '@/config/userShop'

// shadcn ui components
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'


const ProductFilter = ({filters, handleFilter}) => {

  return (
    <div className='bg-background rounded-lg shadow-sm'>
        {/* heading */}
        <div className='p-4 border-b'>
            <h2 className='text-lg font-bold'>Filters</h2>
        </div>

        {/* filter options */}
        <div className='p-4 space-y-4'>
            {
               Object.keys(filterOptions).map((keyItem, idx) => (
                <Fragment key={idx}>
                    <div>
                        <h3 className='text-base font-semibold capitalize'>{keyItem}</h3>
                        <div className='grid gap-2 mt-2'>
                            {
                                filterOptions[keyItem].map(option => (
                                    <Label key={option.id} className='flex items-center gap-2 font-medium cursor-pointer'>
                                        <Checkbox 
                                            checked={
                                                filters &&
                                                Object.keys(filters).length > 0 &&
                                                filters[keyItem] &&
                                                filters[keyItem].indexOf(option.id) > -1   
                                            }
                                            onCheckedChange={() => handleFilter(keyItem, option.id)}
                                            className='cursor-pointer'
                                        />
                                        {option.label}
                                    </Label>
                                ))
                            }
                        </div>
                    </div>
                    <Separator/>
                </Fragment>
               ))
            }
        </div>
    </div>
  )
}

export default ProductFilter