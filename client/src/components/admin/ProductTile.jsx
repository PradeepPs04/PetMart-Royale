import React from 'react'

// shadcn ui components
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AdminProductTile = ({
  product,
  setCurrentEditId,
  setOpenCreateProductDialog,
  setFormData,
  setImagePreview,
  handleDelete
}) => {
  return (
    <Card className='w-full max-w-sm mx-auto'>
        <div>
            {/* image */}
            <div className='relative'>
                <img 
                    src={product?.image}
                    alt={product?.title}
                    loading='lazy'
                    className='w-full h-[300px] object-cover rounded-lg'
                />
            </div>

            {/* product details */}
            <CardContent>
              {/* name */}
              <h2 className='text-xl font-bold my-2'>
                {
                  product?.title.length > 55 ? (
                      `${product?.title.slice(0,55)}...`
                  ) : product?.title
                }
              </h2>

              {/* price */}
              <div className='flex justify-between items-center mb-2'>
                <span 
                  className={`text-lg
                    ${product?.salePrice > 0 
                      ? 'line-through text-muted-foreground font-semibold' 
                      : 'text-primary font-bold'}
                  `}
                >
                  ₹{product?.price}
                </span>
                <span className='text-lg font-bold'>
                  {
                    product?.salePrice > 0 &&
                    `₹${product?.salePrice}`
                  }
                </span>
              </div>
            </CardContent>

            {/* action buttons */}
            <CardFooter className='flex justify-between items-center'>
                {/* edit button */}
                <Button
                  onClick={() => {
                    setOpenCreateProductDialog(true);
                    setCurrentEditId(product?._id);
                    setFormData(product);
                    setImagePreview(product?.image);
                  }}
                  className='cursor-pointer'
                >
                  Edit
                </Button>
                
                {/* delete button */}
                <Button
                  onClick={() => handleDelete(product._id)}
                  className='cursor-pointer'
                >
                  Delete
                </Button>
            </CardFooter>
        </div>
    </Card>
  )
}

export default AdminProductTile