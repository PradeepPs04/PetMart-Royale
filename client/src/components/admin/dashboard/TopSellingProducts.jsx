import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

// shadcn ui components
import { Card, CardContent } from '@/components/ui/card';

// APIs
import { fetchTopSellingProducts } from '@/services/operations/adminAPIs';

const ProductCard = ({product}) => {
    return (
        <Card className='flex justify-center items-center min-w-[250px]'>
        <div>
            {/* image */}
            <div className='relative'>
                <img 
                    src={product?.image}
                    alt={product?.title}
                    loading='lazy'
                    className='w-full h-[150px] object-contain rounded-lg'
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
                  className={` ${product?.salePrice > 0 ? 'line-through' : 'font-bold'}
                  text-lg text-primary`}
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
        </div>
    </Card>
    )
}

const TopSellingProducts = () => {

    const [topSellingProds, setTopSellingProds] = useState([]);

    const dispatch = useDispatch();

    // fetch top selling products on first render
    useEffect(() => {
        const getTopSellingProds = async () => {
            const result = await fetchTopSellingProducts(dispatch);
            if(result) {
                setTopSellingProds(result);
            }
        }

        getTopSellingProds();
    }, []);

  return (
    <section className='mt-12 p-4 outline rounded-lg'>
        {/* heading */}
        <h2 className='mt-3 text-2xl font-bold'>
            Top Selling Products
        </h2>

        {/* product cards */}
        <div className='w-[89vw] md:w-[80vw] overflow-x-auto py-4'>
            <div className='mt-4 flex gap-6'>
                {
                    topSellingProds && topSellingProds.length > 0 ? (
                        topSellingProds.map(product => (
                            <ProductCard 
                                key={product._id}
                                product={product}
                            />
                        ))
                    ) : null
                }
            </div>
        </div>

    </section>
  )
}

export default TopSellingProducts