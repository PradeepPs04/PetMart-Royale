import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// redux store actions
import { setSearchResults } from '@/store/shop/search-slice';

// icons
import { MicIcon, MicOffIcon, SearchIcon } from 'lucide-react';

// components
import ShoppingProductTile from '@/components/shopping/ProductTile';
import PaginationWrapper from '@/components/common/PaginationWrapper';
import ProductDetailsDialog from '@/components/shopping/ProductDetails';

// skeleton loader
import SearchSkeleton from '@/components/skeleton/shopping/SearchSkeleton';

// shadcn ui components
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

// APIs
import { searchProducts } from '@/services/operations/searchAPI';
import { addToCart, fetchCartItems, getProductDetails } from '@/services/operations/shopAPIs';

const SearchProducts = () => {

    const [keyword, setKeyword] = useState('');
    const [openProdDetailsDialog, setOpenProdDetailsDialog] = useState(false);
    const [searchType, setSearchType] = useState('input');


    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [_, setSearchParams] = useSearchParams();

    const { isSearchLoading, searchResults } = useSelector(state => state.shopSearch);
    const { cartItems } = useSelector(state => state.shopCart);
    const { productDetails } = useSelector(state => state.shopProducts);

    const dispatch = useDispatch();

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const inputRef = useRef(null);

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
    const success = await addToCart(data);

    // if item added successfully call fetch cart api (to update cart items in redux store)
    if(success) {
        await fetchCartItems(dispatch);
    }
    }

    // function to get a specific product details
    const handleGetProductDetails = async (productId) => {
    await getProductDetails(productId, dispatch);
    }


    // maintain previous searched value when clicked on input box
    const handleInputClick = () => {
        if(searchType === 'voice') {
            inputRef.current.value = transcript;
            setKeyword(transcript);
        } else {
            setKeyword(keyword);
        }
        
        setSearchType('input');
    }

    // function to take input from user's microphone
    const handleVoiceInput = () => {
        if(!browserSupportsSpeechRecognition) {
            toast.error("Browser doesn't support speech recognition");
            return;
        }

        setSearchType('voice');
        SpeechRecognition.startListening();
    }

    // call search product API on input change
    useEffect(() => {
        let timeOutId = null;
        // get input value
        const input = searchType === 'voice' ? transcript : keyword;

        if(input && input.trim() !== "" && input.trim().length >= 3) {
            timeOutId = setTimeout(async () => {
                    setSearchParams(new URLSearchParams(`?keyword=${input}`));
                    await searchProducts(input, dispatch);
            }, 1000);
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${input}`));
            dispatch(setSearchResults([]));
        }

        return () => clearTimeout(timeOutId);
    }, [keyword, transcript]);

    // fetch products details
    useEffect(() => {
    if(productDetails !== null) {
        setOpenProdDetailsDialog(true);
    }
    }, [productDetails]);

  return (
    <div className='relative min-h-[80vh] container mx-auto md:px-6 px-4 py-8'>
        {/* search box */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-8'>
            <div className='w-full flex items-center gap-4'>
                <SearchIcon className='absolute left-6 md:left-8 text-muted-foreground opacity-50'/>
                <Input
                    value={searchType === 'voice' ? transcript : keyword}
                    ref={inputRef}
                    name="keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                    onClick={handleInputClick}
                    placeholder="Search products..."
                    className='px-10 py-6'
                />

                {/* voice search button */}
                <div>
                    <Button
                        onClick={handleVoiceInput}
                        variant='ghost'
                        className={` 
                            
                            cursor-pointer bg-black text-white hover:bg-black hover:text-white
                        `}
                    >
                        {
                            listening ? (
                                <MicIcon className='transition-all duration-300'/>
                            ): (
                                <MicOffIcon className='transition-all duration-300'/>
                            )
                        }
                    </Button>
                </div>
            </div>
        </div>

        {/* display skeleton loader or products */}
        {
            isSearchLoading 
                ? (<SearchSkeleton/>)
                : (
                    !searchResults.length ? (
                        <h1 className='text-5xl font-extrabold text-center text-muted-foreground opacity-50'>No Result Found!</h1>
                    ) : (
                        // product cards
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                            {
                                [...searchResults]
                                    .slice((currentPage-1)*itemsPerPage, (currentPage)*itemsPerPage).map(item => (
                                        <ShoppingProductTile
                                            key={item._id}
                                            product={item}
                                            handleAddToCart={handleAddToCart}
                                            handleGetProductDetails={handleGetProductDetails}
                                        />
                                    ))
                            }
                        </div>
                    )
                )
        }

        {/* Pagination */}
        {
            searchResults && searchResults?.length > 0 && (
                <div className='mt-6'>
                    <PaginationWrapper
                    totalItems={searchResults?.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />
                </div>
            )
        }

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