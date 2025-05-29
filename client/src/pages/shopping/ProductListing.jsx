import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

// components
import ProductFilter from '@/components/shopping/Filter'
import ShoppingProductTile from '@/components/shopping/ProductTile'
import ProductDetailsDialog from '@/components/shopping/ProductDetails'
import PaginationWrapper from '@/components/common/PaginationWrapper'

// skeleton components
import ProductListlingsSkeleton from '@/components/skeleton/shopping/ProductListlingsSkeleton'

// shadcn ui components
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenuContent, 
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu'

// icons
import { ArrowUpDownIcon } from 'lucide-react'

// data config
import { sortOptions } from '@/config/userShop'

// APIs
import { 
  addToCart, 
  fetchCartItems, 
  fetchFilteredProducts,
   getProductDetails 
} from '@/services/operations/shopAPIs'


// create query params using selected options on filter
const createSearchParamsFromFilter = (filterParams) => {
  const queryParams = [];

  for(const [key, value] of Object.entries(filterParams)) {
    if(Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join('&');
}

const ShoppingProductListing = () => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { isLoading, products, productDetails, relatedProducts } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector(state => state.shopCart);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('price-lowtohigh');
  const [openProdDetailsDialog, setOpenProdDetailsDialog] = useState(false);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get('category');
  

  // function to set sort value in sort state
  const handleSort = (value) => {
    setSort(value);
  }

  // function to set filters in filter state
  const handleFilter = (sectionId, currentOption) => {
    let copyFilters = {...filters};;

    // check if anything from this section is selected or not
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(sectionId);

    // if selecting an option for the 1st time from that section
    if(indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [sectionId]: [currentOption]
      }
    } else {
      // check if current option was previously selected or not
      const indexOfCurrentOption = copyFilters[sectionId].indexOf(currentOption);
      if(indexOfCurrentOption === -1) {
        copyFilters[sectionId].push(currentOption);
      } else {
        // unchecking the option, so remove that from filters
        copyFilters[sectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(copyFilters);

    // store filters in session storage
    sessionStorage.setItem('filters', JSON.stringify(copyFilters));
  }

  // function to get a specific product details
  const handleGetProductDetails = async (productId, dialogRef=null) => {
    // get product details
    await getProductDetails(productId, dispatch);
    
    // scroll to top of product details dialog
    if(dialogRef) {
      dialogRef.current.scrollTo({ top: 0 });
    }
  }

  // function to add item to cart
  const handleAddToCart = async (productId, totalStock) => {
    // if guest user
    if(user?.role === 'guest') {
      toast.error("Please login to continue!", {position: 'top-center'});
      return;
    }

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

  // set default sort value on first render
  useEffect(() => {
    setSort('price-lowtohigh');
    // pick previously selected filters from session storage
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  }, [categorySearchParam]);
  
  // change query params on filter change
  useEffect(() => {
    if(filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsFromFilter(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if(filters !== null && sort !== null) {
        await fetchFilteredProducts(filters, sort, dispatch);
      }
    }
    fetchProducts();
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if(productDetails !== null) {
      setOpenProdDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>

        {/* filters */}
        <ProductFilter 
          filters={filters}
          handleFilter={handleFilter}
        />

        {
          isLoading ? (
            <ProductListlingsSkeleton/>
          ) : (
          <div className='bg-background w-full rounded-lg shadow-sm'>
            <div className='p-4 border-b flex items-center justify-between'>
              <h2 className='text-lg font-bold'>All Products</h2>

              {/* product count & sort by filter*/}
              <div className='flex items-center gap-3'>
                {/* no. of products */}
                <span className='text-muted-foreground'>
                  {products?.length || 0} Products
                </span>

                {/* sort by dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm' className='flex items-center gap-1 cursor-pointer'>
                      <ArrowUpDownIcon className='w-4 h-4'/>
                      <span>Sort by</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align='end' className='w-[200px]'>
                    <DropdownMenuRadioGroup 
                      value={sort} 
                      onValueChange={handleSort}
                    >
                      {
                        sortOptions.map((sortItem) => (
                          <DropdownMenuRadioItem
                            key={sortItem.id}
                            value={sortItem.id}
                            className='cursor-pointer'
                          >
                            {sortItem.label}
                          </DropdownMenuRadioItem>
                        ))
                      }
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* product cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {
                  products && products?.length > 0 && (
                    [...products]
                      .slice((currentPage-1)*itemsPerPage, (currentPage)*itemsPerPage)
                      .map((item, idx) => (
                        <ShoppingProductTile 
                          key={idx} 
                          product={item}
                          handleGetProductDetails={handleGetProductDetails}
                          handleAddToCart={handleAddToCart}
                        />
                    ))
                  )
                }
            </div>
          </div>
            
          )
        }
        {/* products cards */}
        
        {/* product details dialog */}
        <ProductDetailsDialog
          open={openProdDetailsDialog}
          setOpen={setOpenProdDetailsDialog}
          product={productDetails}
          handleAddToCart={handleAddToCart}
          handleGetProductDetails={handleGetProductDetails}
          relatedProducts={relatedProducts}
        />

        {/* Pagination */}
        <PaginationWrapper
          totalItems={products?.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </div>
  )
}

export default ShoppingProductListing