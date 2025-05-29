import { toast } from "react-toastify";

import { apiConnector } from "../apiConnector";

// APIs endpoints
import { shopEndpoints } from "../apis";
import { cartEndpoints } from "../apis";

// shop reducers
import { 
    setLoading, 
    setProductDetails, 
    setProductDetailsLoading, 
    setProducts, 
    setRelatedProducts 
} from "@/store/shop/product-slice";

// cart reducers
import { 
    setCartLoading, 
    setCartItems, 
    setCartId 
} from "@/store/shop/cart-slice";

// shop API URLs
const {
    GET_FILTERED_PRODUCTS_API,
    GET_PRODUCT_DETAILS_API,
} = shopEndpoints

// cart API URLs
const {
    ADD_TO_CART_API,
    UPDATE_CART_API,
    DELETE_FROM_CART_API,
    FETCH_CART_ITEMS_API,
} = cartEndpoints;

// function to call fetch products api
export async function fetchFilteredProducts(filterParams, sortParams, dispatch) {
    dispatch(setLoading(true));

    try {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        });

        const response = await apiConnector('GET', `${GET_FILTERED_PRODUCTS_API}?${query}`);

        console.log("FETCH PRODUCTS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch products right now try again later");
        }

        // set products in shop products slice
        dispatch(setProducts(response?.data?.data));
    } catch(err) {
        console.error("FETCH PRODUCTS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setLoading(false));
}

// function to call get product details api
export async function getProductDetails(id, dispatch) {
    const toastId = toast.loading("Loading...", {position: 'top-center'});
    dispatch(setProductDetailsLoading(true));

    try {
        const response = await apiConnector(
            'GET',
            `${GET_PRODUCT_DETAILS_API}/${id}`
        );

        console.log("GET PRODUCT DETAILS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch product details right now try again later");
        }

        // set product details in shop products slice
        dispatch(setProductDetails(response?.data?.data?.product));

        // set related products
        dispatch(setRelatedProducts(response?.data?.data?.relatedProducts));
    } catch(err) {
        console.error("GET PRODUCT DETAILS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
}

// function to call add to cart api
export async function addToCart(data) {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector(
            'POST',
            ADD_TO_CART_API,
            data,
        );

        console.log("ADD TO CART API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't add item to cart right now try again later");
        }
        
        success = true;
        toast.success(response?.data?.message);
    } catch(err) {
        console.error("ADD TO CART API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return success;
}

// function to call fetch cart items api
export async function fetchCartItems(dispatch) {
    dispatch(setCartLoading(true)); 

    try {
        const response = await apiConnector(
            'GET',
            FETCH_CART_ITEMS_API,
        );

        console.log("FETCH CART ITEMS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch cart items right now try again later");
        }

        // set data in cart slice
        dispatch(setCartId(response?.data?.data?._id));
        dispatch(setCartItems(response?.data?.data?.items));

    } catch(err) {
        console.error("FETCH CART ITEMS API error...", err);
    }

    dispatch(setCartLoading(false));
}

// function to call update cart item quantity api
export async function updateCartItem(data, dispatch) {
    try {
        const response = await apiConnector(
            'PUT',
            UPDATE_CART_API,
            data,
        );

        console.log("UPDATE CART API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't update cart item right now try again later");
        }

        // set cart items in cart slice
        dispatch(setCartItems(response?.data?.data?.items));
    } catch(err) {
        console.error("UPDATE CART API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }
}

// function to call delete from cart api
export async function deleteFromCart(productId, dispatch) {
    try {
        const response = await apiConnector(
            'DELETE',
            `${DELETE_FROM_CART_API}/${productId}`,
        );

        console.log("DELETE FROM CART API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't delete item from cart right now try again later");
        }

        // set cart items in cart slice
        dispatch(setCartItems(response?.data?.data?.items));

        toast.success(response?.data?.message);
    } catch(err) {
        console.error("DELETE FROM CART API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }
}
