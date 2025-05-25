import { toast } from "react-toastify";

import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../apis";

// redux reducers
import { setLoading, setProducts } from "@/store/admin/product-slice";
import { setAdminOrderLoading, setOrderDetails, setOrderList } from "@/store/admin/order-slice";

// api endpoints
const {
    CREATE_PRODUCT_API,
    EDIT_PRODUCT_API,
    DELETE_PRODUCT_API,
    FETCH_ALL_PRODUCTS_API,
    FETCH_TOP_SELLING_PRODUCTS_API,
    GET_ALL_ORDERS_API,
    GET_ORDER_DETAILS_FOR_ADMIN_API,
    UPDATE_ORDER_STATUS_API,
} = adminEndpoints;

// function to call create product api
export async function createProduct(formData, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    let success = false;

    try {
        const response = await apiConnector(
            'POST',
            CREATE_PRODUCT_API,
            formData,
            {'Content-Type': 'multipart/form-data'},
        );

        console.log("CREATE PRODUCT API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't create product right now try again later");
        }

        success = true;
        toast.success(response?.data?.message);
    } catch(err) {
        console.error("CREATE PRODUCT API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));

    return success;
}

// function to call fetch products api
export async function fetchAllProducts(dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector('GET', FETCH_ALL_PRODUCTS_API);

        console.log("FETCH PRODUCTS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch products right now try again later");
        }

        // set products in admin products slice
        dispatch(setProducts(response?.data?.data));

        toast.success(response?.data?.message);
    } catch(err) {
        console.error("FETCH PRODUCTS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));

}

// function to call edit product api
export async function editProduct(id, formData, dispatch) {
    const toastId = toast.loading("Loading...");
    let result = null;
    dispatch(setLoading(true));

    try {
        const response = await apiConnector(
            'PUT',
            `${EDIT_PRODUCT_API}/${id}`,
            formData,
            {'Content-Type': 'multipart/form-data'},
        );

        console.log("EDIT PRODUCT API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't edit product right now try again later");
        }

        result = response?.data?.data;
        toast.success(response?.data?.message);
    } catch(err) {
        console.error("EDIT PRODUCT API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));

    return result;
}

// function to call delete product api
export async function deleteProduct(id, dispatch) {
    const toastId = toast.loading("Loading...");
    let result = null;
    dispatch(setLoading(true));

    try {
        const response = await apiConnector(
            'DELETE',
            `${DELETE_PRODUCT_API}/${id}`,
            {},
            {'Content-Type': 'multipart/form-data'},
        );

        console.log("DELETE PRODUCT API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't delete product right now try again later");
        }

        result = response?.data?.data;
        toast.success(response?.data?.message);
    } catch(err) {
        console.error("DELETE PRODUCT API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));

    return result;
}

// function to call get all orders api
export async function getAllOrders(dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setAdminOrderLoading(true));

    try {
        const response = await apiConnector("GET", GET_ALL_ORDERS_API);

        console.log("GET ALL ORDERS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch orders right now! Try again later");
        }

        // set orders in store
        dispatch(setOrderList(response?.data?.data));
    }   catch(err) {
        console.error("GET ALL ORDERS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setAdminOrderLoading(false));
    toast.dismiss(toastId);
}

// function to call get order details for admin api
export async function getOrderDetailsForAdmin(id, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setAdminOrderLoading(true));

    try {
        const response = await apiConnector("GET", `${GET_ORDER_DETAILS_FOR_ADMIN_API}/${id}`);

        console.log("GET ORDER DETAILS FOR ADMIN API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch order details right now! Try again later");
        }

        // set order Details in store
        dispatch(setOrderDetails(response?.data?.data));
    }   catch(err) {
        console.error("GET ORDER DETAILS FOR ADMIN API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setAdminOrderLoading(true));
    toast.dismiss(toastId);
}

// function to call update order status api
export async function updateOrderStatus(orderId, orderStatus, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setAdminOrderLoading(true));
    let result = null;

    try {
        const response = await apiConnector(
            'PUT',
            `${UPDATE_ORDER_STATUS_API}/${orderId}`,
            {orderStatus},
        );

        console.log("UPDATE ORDER STATUS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't update order status! Try again later");
        }

        toast.success(response?.data?.message);
        result = response?.data?.data;
    } catch(err) {
        console.error("UPDATE ORDER STATUS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setAdminOrderLoading(false));
    toast.dismiss(toastId);

    return result;
}

// functino to fetch top selling products
export async function fetchTopSellingProducts(dispatch) {
    dispatch(setLoading(true));
    let result = null;

    try {
        const response = await apiConnector(
            "GET",
            FETCH_TOP_SELLING_PRODUCTS_API,
        );

        console.log("FETCH TOP SELLING PRODUCTS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch top selling products! Try again later");
        }

        result = response?.data?.data;
    } catch(err) {
        console.error("FETCH TOP SELLING PRODUCTS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    return result;
}