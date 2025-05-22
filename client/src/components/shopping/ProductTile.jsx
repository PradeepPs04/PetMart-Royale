import React from 'react'

// shadcn ui components
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const ShoppingProductTile = ({product, handleGetProductDetails, handleAddToCart, dialogRef}) => {
  return (
    <Card className='w-full max-w-sm mx-auto cursor-pointer'>
        <div
            onClick={() => handleGetProductDetails(product?._id, dialogRef)}
        >
            {/* image */}
            <div className='relative'>
                <img
                    src={product?.image}
                    alt={product?.title}
                    loading='lazy'
                    className='w-full h-[300px] object-cover rounded-t-lg'
                />
                {
                    product?.totalStock === 0 ? (
                        <Badge
                            className='absolute top-2 left-2 bg-red-500 hover:bg-red-600 select-none'
                        >
                            Out of Stock
                        </Badge>
                    ) : product?.totalStock < 10 ? (
                        <Badge 
                            className='absolute top-2 left-2 bg-red-500 hover:bg-red-600 select-none'
                        >
                            {`Only ${product?.totalStock} items left`}
                        </Badge>
                    ) :
                    product?.salePrice > 0 ? (
                        <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600 select-none'>
                            Sale
                        </Badge>
                    ) : null
                }
            </div>
            
            {/* product details */}
            <CardContent className='p-4'>
                {/* name */}
                <h2 className='text-xl font-bold mb-2'>
                    {
                        product?.title.length > 55 ? (
                            `${product?.title.slice(0,55)}...`
                        ) : product?.title
                    }
                </h2>
                
                {/* category & brand */}
                <div className='flex justify-between items-center mb-2'>
                    <span className='text-[16px] text-muted-foreground first-letter:capitalize'>{product?.category}</span>
                    <span className='text-[16px] text-muted-foreground first-letter:capitalize'>{product?.brand}</span>
                </div>
                
                {/* price */}
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product.salePrice > 0 ? 'line-through text-muted-foreground' : 'text-primary'}
                    text-lg font-semibold`}>₹{product?.price}</span>
                    <span className='text-lg font-semibold text-primary'>{product?.salePrice > 0 ? `₹${product?.salePrice}` : null}</span>
                </div>
            </CardContent>
        </div>

        {/* add to cart button */}
        <CardFooter>
        {
            product?.totalStock === 0 ? (
                <Button className='w-full opacity-60 cursor-not-allowed'>
                    Out of Stock
                </Button>
            ) : (
                <Button 
                    onClick={() => handleAddToCart(product?._id, product?.totalStock)}
                    className='w-full cursor-pointer'
                >
                    Add to cart
                </Button>
            )
        }
        </CardFooter>
    </Card>
  )
}

export default ShoppingProductTile