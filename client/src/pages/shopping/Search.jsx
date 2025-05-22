import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// components
import ShoppingProductTile from '@/components/shopping/ProductTile';

// shadcn ui components
import { Input } from '@/components/ui/input'

// APIs
import { searchProducts } from '@/services/operations/searchAPI';

import { setSearchResults } from '@/store/shop/search-slice';
import { addToCart, fetchCartItems, getProductDetails } from '@/services/operations/shopAPIs';
import { toast } from 'react-toastify';
import ProductDetailsDialog from '@/components/shopping/ProductDetails';

const SearchProducts = () => {

    const [keyword, setKeyword] = useState('');
    const [openProdDetailsDialog, setOpenProdDetailsDialog] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const { searchResults } = useSelector(state => state.shopSearch);
    const { cartItems } = useSelector(state => state.shopCart);
    const { productDetails } = useSelector(state => state.shopProducts);

    const dispatch = useDispatch();

    // function to add item to cart
    const handleAddToCart = async (productId, totalStock) => {
    let getCartItems = cartItems || [];

    if(getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === productId);

        if(indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if(getQuantity + 1 > totalStock) {
            toast.error(`Only ${getQuantity} quantity can be added for this item`);
            return;
        }
        }
    }

    const data = {
        productId: productId,
        quantity: 1,
    };

    // call api
    const success = await addToCart(data, dispatch);

    // if item added successfully call fetch cart api (to update cart items in redux store)
    if(success) {
        await fetchCartItems(dispatch);
    }
    }

    // function to get a specific product details
    const handleGetProductDetails = async (productId) => {
    await getProductDetails(productId, dispatch);
    }

    // fetch searched products
    useEffect(() => {
        if(keyword && keyword.trim() !== '' && keyword.trim().length >= 3) {
            setTimeout(async () => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                await searchProducts(keyword, dispatch);
            });
        } else {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(setSearchResults([]));
        }
    }, [keyword]);

    // fetch products details
    useEffect(() => {
    if(productDetails !== null) {
        setOpenProdDetailsDialog(true);
    }
    }, [productDetails]);

  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
        <div className='flex justify-center mb-8'>
            <div className='w-full flex items-center'>
                <Input
                    value={keyword}
                    name="keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search products..."
                    className='py-6'
                />
            </div>
        </div>

        {/* no result found heading */}
        <div>
            {
                !searchResults.length ? (
                    <h1 className='text-5xl font-extrabold'>No result found!</h1>
                ) : null
            }
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {
                searchResults.map(item => (
                    <ShoppingProductTile
                        key={item._id}
                        product={item}
                        handleAddToCart={handleAddToCart}
                        handleGetProductDetails={handleGetProductDetails}
                    />
                ))
            }
        </div>

        {/* product details dialog */}
        <ProductDetailsDialog
          open={openProdDetailsDialog}
          setOpen={setOpenProdDetailsDialog}
          product={productDetails}
          handleAddToCart={handleAddToCart}
        />
    </div>
  )
}

export default SearchProducts