import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// constants
import { userRoles } from '@/constants'

// images
import activeLogo from '../../assets/brandLogos/Active.png'
import himalayaLogo from '../../assets/brandLogos/Himalaya.png'
import pedigreeLogo from '../../assets/brandLogos/Pedigree.png'
import purepetLogo from '../../assets/brandLogos/Purepet.png'
import royalCaninLogo from '../../assets/brandLogos/Royalcanin.png'
import whiskasLogo from '../../assets/brandLogos/Whiskas.jpg'

// APIs
import { addToCart, fetchCartItems, fetchFilteredProducts, getProductDetails } from '@/services/operations/shopAPIs'

// shadcn ui compnennts
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// components
import ShoppingProductTile from '@/components/shopping/ProductTile'
import ProductDetailsDialog from '@/components/shopping/ProductDetails'

// icons
import { DogIcon, ChevronLeft, ChevronRight, CatIcon, BirdIcon, BedIcon, Dice5 } from 'lucide-react'

// APIs
import { getFeatureImages } from '@/services/operations/featureImageAPI'
import HomePageSkeleton from '@/components/skeleton/shopping/HomePageSkeleton'

// data for category cards
const categories = [
  { id: "cats", label: "cats", icon: CatIcon },
  { id: "dogs", label: "Dogs", icon: DogIcon },
  { id: "birds", label: "Birds" , icon: BirdIcon },
  { id: "toys", label: "Toys", icon: Dice5 },
  { id: "beds&cages", label: "Shelter", icon: BedIcon },
];

// data for brand cards
const brands = [
  { id: "pedigree", label: "Pedigree", iconImg: pedigreeLogo, },
  { id: "himalaya", label: "Himalaya", iconImg: himalayaLogo, },
  { id: "active", label: "Active", iconImg: activeLogo, },
  { id: "purepet", label: "Purepet", iconImg: purepetLogo, },
  { id: "whiskas", label: "Whiskas", iconImg: whiskasLogo, },
  { id: "royal-canin", label: "Royal Canin", iconImg: royalCaninLogo, },
];

const ShoppingHome = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [openProdDetailsDialog, setOpenProdDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);
  const { isLoading, products, productDetails } = useSelector(state => state.shopProducts);
  const { featureImageList } = useSelector(state => state.common);

  // go to selected category/brand page
  const handleNavigateToListingPage = (item, section)  => {
    // remove previously selected filters (if any)
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [item.id]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate('/shop/listing');
  }

  // function to get details of a specific product
  const handleGetProductDetails = async(productId) => {
    await getProductDetails(productId, dispatch);
  }
  
  // function to add item to cart
  const handleAddToCart = async (productId) => {
    // if guest user
    if(user?.role === userRoles.GUEST) {
      toast.error("Please login to continue!", {position: 'top-center'});
      return;
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

  // change banner image after every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide+1) % featureImageList.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  // fetch all products
  useEffect(() => {
    const fetchProducts = async() => {
      await fetchFilteredProducts({}, 'price-lowtohigh', dispatch);
    }

    fetchProducts();
  }, [dispatch]);

  // fetch product details
  useEffect(() => {
      if(productDetails !== null) {
        setOpenProdDetailsDialog(true);
      }
    }, [productDetails]);
  
  // fetch feature banner images
  useEffect(() => {
    const fetchFeatureImages = async () => {
      await getFeatureImages(dispatch);
    }
    fetchFeatureImages();
  }, [dispatch]);


  // if loading display skeleton loader
  if(isLoading) {
    return <HomePageSkeleton/>
  }

  return (
    <div className='flex flex-col min-h-screen'>

    {/* image banners */}
      <div className='relative w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden'>
        {
          featureImageList && featureImageList.length > 0 ? (
            featureImageList.map((item, idx) => (
              <img
                src={item?.image}
                key={idx}
                className={`
                  ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}
                  absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000
                `}
              />
            ))
          ) : null
        }
        {/* left button */}
        <Button 
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)}
          variant='outline' 
          size='icon' 
          className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'
         >
          <ChevronLeft className='w-4 h-4'/>
        </Button>
        
        {/* right button */}
        <Button 
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}
          variant='outline' 
          size='icon' 
          className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
         >
          <ChevronRight className='w-4 h-4'/>
        </Button>
      </div>

      {/* shop by category cards */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          {/* heading */}
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>

          {/* cards */}
          <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
            {
              categories.map((item) => (
                <Card 
                  key={item.id}
                  onClick={() => handleNavigateToListingPage(item, 'category')}
                  className='cursor-pointer hover:shadow-lg transition-shadow'
                >
                  <CardContent className='flex flex-col items-center justify-center p-6'>
                    <item.icon className='w-12 h-12 mb-4 text-primary'/>
                    <span className='font-bold'>{item.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      {/* products cards */}
      <section className='py-12'>
        {/* heading */}
        <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
          
        {/* cards */}
        <div className='px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {
            products && products.length > 0 
              ? (
                [...products].splice(0,4).map((item) => (
                  <ShoppingProductTile 
                    key={item._id}
                    product={item}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              ) : null
          }
        </div>
      </section>
      
      {/* shop by brands cards */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          {/* heading */}
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by brand</h2>

          {/* cards */}
          <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
            {
              brands.map((item) => (
                <Card 
                  key={item.id}
                  onClick={() => handleNavigateToListingPage(item, 'brand')}
                  className='cursor-pointer hover:shadow-lg transition-shadow'
                >
                  <CardContent className='flex flex-col items-center justify-center p-6'>
                    <img className='w-20 h-20 mb-4 text-primary object-cover' src={item.iconImg} loading='lazy'/>
                    <span className='font-bold'>{item.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>
      

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

export default ShoppingHome