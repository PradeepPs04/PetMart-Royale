import { toast } from "react-toastify";

import { apiConnector } from "../apiConnector";
import { orderEndpoints } from "../apis";
import { setOrderDetails, setOrderId, setOrderList, setOrderLoading } from "@/store/shop/order-slice";
import { setCartId, setCartItems } from "@/store/shop/cart-slice";

// logo
import logo from '../../assets/logo.png'

const {
    CREATE_ORDER_API,
    VERIFY_PAYMENT_API,
    GET_USER_ORDERS_API,
    GET_ORDER_DETAILS_API,
} = orderEndpoints;

// function to add reazorpay script to page
function loadScript(src) {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(failed);
        }

        document.body.appendChild(script);
    });
}

// function to call create order api
export async function createOrder(orderData, user, dispatch, navigate) {
    const toastId = toast.loading("Loading...");
    dispatch(setOrderLoading(true));

    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res) {
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // initiate the order
        const response = await apiConnector(
            'POST',
            CREATE_ORDER_API,
            orderData,
        );

        console.log("CREATE ORDER API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't created order! Try again later");
        }

        
        const paymentResponse = response?.data?.data?.paymentResponse;
        const createdOrder = response?.data?.data?.createdOrder;

        // set order id in store
        dispatch(setOrderId(res?.data?.data?.createdOrder?._id));

        // create options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: paymentResponse?.currency,
            amount: paymentResponse?.amount,
            order_id: paymentResponse?.id,
            name: "PetMart Royale",
            description: "Thank you for purchasing with us",
            image: logo,
            prefill: {
                name: user?.userName,
                email: user?.email,
            },
            handler: function(response) {
                // verify payment
                verifyPayment({...response, cartId: orderData.cartId, orderId: createdOrder?._id}, dispatch, navigate);
            }
        }

        // create razoypay payment modal
        const paymentObject = new window.Razorpay(options);
        

        // open payment modal
        paymentObject.open();

        paymentObject.on('payment.failed', function(response) {
            toast.error("Oops, payment failed");
            console.log(response.error);
        });
    } catch(err) {
        console.error("CREATE ORDER API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setOrderLoading(false));
    toast.dismiss(toastId);
}

// function to call verify payment api
export async function verifyPayment(bodyData, dispatch, navigate) {
    const toastId = toast.loading("Verifying payment...");
    dispatch(setOrderLoading(true));

    try {
        const response = await apiConnector(
            "POST",
            VERIFY_PAYMENT_API,
            bodyData,
        );

        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        // reset cart
        dispatch(setCartId(null));
        dispatch(setCartItems([]));

        toast.success("Payment successfull");

        // navigate to my orders page
        navigate('/shop/account');
    } catch(err) {
        console.error("VERIFY PAYMENT API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    dispatch(setOrderLoading(false));
}

// function to call get user orders api
export async function getUserOrders(userId, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setOrderLoading(true));

    try {
        const response = await apiConnector(
            'GET',
            `${GET_USER_ORDERS_API}/${userId}`,
        );

        console.log("GET USER ORDERS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch orders! Try again later");
        }

        // set order list in store
        dispatch(setOrderList(response?.data?.data));
    } catch(err) {
        console.error("GET USER ORDERS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setOrderLoading(false));
    toast.dismiss(toastId);
}

// function to call get order details api
export async function getOrderDetails(orderId, dispatch) {
    const toastId = toast.loading("Loading...", {position: 'top-center'});

    try {
        const response = await apiConnector(
            'GET',
            `${GET_ORDER_DETAILS_API}/${orderId}`
        );

        console.log("GET ORDER DETAILS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch orders details! Try again later");
        }

        // set order details in store
        dispatch(setOrderDetails(response?.data?.data));
    } catch(err) {
        console.error("GET ORDER DETAILS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
}