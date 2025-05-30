import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import StarRating from '../common/StarRating'

// shadcn ui components
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

// icons
import { StarIcon } from 'lucide-react'

// redux actions
import { setProductDetails } from '@/store/shop/product-slice'

// APIs
import { addReview, getReviews } from '@/services/operations/ratingAndReviewAPIs'
import ShoppingProductTile from './ProductTile'


const ProductDetailsDialog = ({open, setOpen, product, handleAddToCart, handleGetProductDetails,  relatedProducts}) => {

    const [reviewMsg, setReviewMsg] = useState('');
    const [rating, setRating] = useState(0);

    const {user} = useSelector(state => state.auth);
    const {reviews} = useSelector(state => state.review);

    const dispatch = useDispatch();

    const productDetailsDialogRef = useRef(null);

    const handleDialogClose = () => {
        setOpen(false);
        dispatch(setProductDetails(null));
        setRating(0);
        setReviewMsg('');
    }
    
    const handleRatingChange = (getRating) => {
        setRating(getRating);
    }

    // function to add review
    const handleAddReview = async () => {
        // create data
        const data = {
            productId: product?._id,
            userId: user?.id,
            userName: user?.userName,
            rating: rating,
            review: reviewMsg,
        }

        // call add review api
        const result = await addReview(data, dispatch);

        // fetch all reviews
        if(result) {
            await getReviews(product._id, dispatch);
        }

        // reset form
        setRating(0);
        setReviewMsg('');
    }

    // calculate average rating
    const averageReview = reviews && reviews.length > 0 ?
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

    // fetch product reviews when product details dialog is opened
    useEffect(() => {
        const fetchAllReviews = async () => {
            if(product !== null) {
                await getReviews(product?._id, dispatch);
            }
        }

        fetchAllReviews();
    }, [product]);

  return (
    <>
        <Dialog
            open={open}
            onOpenChange={handleDialogClose}
        >
            <DialogContent 
                ref={productDetailsDialogRef}
                className='max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-y-auto overflow-x-hidden'
            >
                {/* product details */}
                <section className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-12'>
                    {/* product iamge */}
                    <div className='relative overflow-hidden rounded-lg'>
                        <img 
                            src={product?.image}
                            alt={product?.title}
                            loading='lazy'
                            width={600}
                            height={600}
                            className='aspect-square w-full object-center'
                        />
                    </div>

                    {/* product details */}
                    <div className=''>
                        {/* name & description */}
                        <div>
                            <h1 className='text-3xl font-extrabold'>{product?.title}</h1>
                            <p className='text-muted-foreground mt-4 mb-5'>{product?.description}</p>
                        </div>

                        {/* price */}
                        <div className='flex items-center justify-between'>
                            <p className={`text-3xl font-black ${product?.salePrice > 0 ? 'line-through text-muted-foreground' : 'text-primary'}`}>
                                ₹{product?.price}
                            </p>

                            {
                                product?.salePrice ? (
                                    <p className='text-3xl font-black text-primary'>
                                        ₹{product?.salePrice}
                                    </p>
                                ) : null
                            }
                        </div>
                        
                        {/* product rating */}
                        <div className='flex items-center gap-2 mt-2'>
                            <StarRating rating={averageReview}/>
                            <span className='text-muted-foreground'>{averageReview.toFixed(2)}</span>
                        </div>

                        {/* add to cart button */}
                        <div className='mt-5'>
                            {
                                product?.totalStock === 0 ? (
                                    <Button
                                        className='w-full opacity-60 cursor-not-allowed'
                                    >
                                        Out of Stock
                                    </Button>
                                ) : (
                                    <Button 
                                        onClick={() => handleAddToCart(product?._id, product?.totalStock)}
                                        className='w-full cursor-pointer'
                                    >
                                        Add to Cart
                                    </Button>
                                )
                            }
                            
                        </div>

                        <Separator className='mt-5'/>

                        {/* rating & reviews container */}
                        <div className='max-h-[300px] overflow-auto'>
                            <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                            
                            {/* reviews */}
                            <div className='grid gap-6'>
                                {
                                    reviews && reviews.length > 0 ? (
                                        reviews.map(item => (
                                            <div key={item?._id} className='flex flex-col gap-4'>
                                                {/* user name */}
                                                <div className='flex gap-2 items-center'>
                                                    <Avatar className='w-10 h-10 border select-none'>
                                                        <AvatarFallback>{item?.userName[0].toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <div className='flex items-center gap-2'>
                                                        <h3 className='font-bold'>{item?.userName}</h3>
                                                    </div>
                                                </div>

                                                {/* rating & review */}
                                                <div className='grid gap-1'>
                                                    {/* stars */}
                                                    <div className='flex items-center gap-0.5'>
                                                        <StarRating rating={item?.rating}/>
                                                    </div>

                                                    <p className='text-muted-foreground'>
                                                        {item?.review}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-muted-foreground'>No Reviews</p>
                                    )
                                }
                                
                            </div>

                        </div>

                        {/* add review */}
                        <div className='mt-10 mb-5 flex flex-col gap-2'>
                            <h3 className='text-lg font-bold'>Write a review</h3>
                            
                            {/* star container */}
                            <div className='flex'>
                                <StarRating
                                    rating={rating}
                                    handleRatingChange={handleRatingChange}
                                    cursorPointer={true}
                                />
                            </div>

                            <Input
                                name="reviewMsg"
                                placeholder='Write a review'
                                value={reviewMsg}
                                onChange={(e) => setReviewMsg(e.target.value)}
                            />

                            {/* submit button */}
                            <Button 
                                onClick={handleAddReview}
                                disabled={reviewMsg.trim() === ''}
                                className='cursor-pointer'    
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </section>
                
                {/* Similar category */}
                <section>
                    {
                        relatedProducts && relatedProducts.length > 0 ? (
                            <div className='flex flex-col'>

                                <h2 className='text-2xl font-bold'>Similar Category</h2>
                                <div className='mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                    {

                                        relatedProducts.map((productItem) => (
                                            <ShoppingProductTile
                                                key={productItem._id} 
                                                product={productItem}
                                                handleGetProductDetails={handleGetProductDetails}
                                                handleAddToCart={handleAddToCart}
                                                dialogRef={productDetailsDialogRef}
                                            />
                                        ))
                                    }
                                </div>
                        </div>
                        ) : null
                    }
                </section>
                
            </DialogContent>
        </Dialog>
    </>
  )
}

export default ProductDetailsDialog