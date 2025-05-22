const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    LOGOUT_API : BASE_URL + "/auth/logout",
    CHECKAUTH_API : BASE_URL + "/auth/check-auth",
}

// ADMIN ENDPOINTS
export const adminEndpoints = {
    CREATE_PRODUCT_API: BASE_URL + '/admin/products/create',
    FETCH_ALL_PRODUCTS_API: BASE_URL + '/admin/products/get',
    EDIT_PRODUCT_API: BASE_URL + '/admin/products/edit',
    DELETE_PRODUCT_API: BASE_URL + '/admin/products/delete',
    GET_ALL_ORDERS_API: BASE_URL + '/admin/order/get',
    GET_ORDER_DETAILS_FOR_ADMIN_API: BASE_URL + '/admin/order/details',
    UPDATE_ORDER_STATUS_API: BASE_URL + '/admin/order/update',
}

// SHOP ENDPOINTS
export const shopEndpoints = {
    GET_FILTERED_PRODUCTS_API: BASE_URL + '/shop/products/get',
    GET_PRODUCT_DETAILS_API: BASE_URL + '/shop/products/get',
}

// CART ENDPOINTS
export const cartEndpoints = {
    ADD_TO_CART_API: BASE_URL + '/shop/cart/add',
    UPDATE_CART_API: BASE_URL + '/shop/cart/update-cart',
    DELETE_FROM_CART_API: BASE_URL + '/shop/cart/delete',
    FETCH_CART_ITEMS_API: BASE_URL + '/shop/cart/get',
}

// ADDRESS ENDPOINTS
export const addressEndPoints = {
    ADD_ADDRESS_API: BASE_URL + '/shop/address/add',
    FETCH_ALL_ADDRESSES_API: BASE_URL + '/shop/address/get',
    EDIT_ADDRESS_API: BASE_URL + '/shop/address/edit',
    DELETE_ADDRESS_API: BASE_URL + '/shop/address/delete',
}

// PAYMENT ENDPOINTS
export const orderEndpoints = {
    CREATE_ORDER_API: BASE_URL + '/shop/order/create',
    VERIFY_PAYMENT_API: BASE_URL + '/shop/order/verify',
    GET_USER_ORDERS_API: BASE_URL + '/shop/order/list',
    GET_ORDER_DETAILS_API: BASE_URL + '/shop/order/details',
}

// SEARCH PRODUCT ENDPOINTS
export const searchProductEndpoints = {
    SEARCH_PRODUCT_API: BASE_URL + '/shop/search',
}

// RATING & REVIEW ENDPOINTS
export const reviewProductEndpoints = {
    ADD_REVIEW_API: BASE_URL + '/shop/review/add',
    GET_REVIEWS_API: BASE_URL + '/shop/review/get',
}

// FEATURE IMAGES ENDPOINTS
export const featureImageEndpoints = {
    ADD_FEATURE_IMAGE_API: BASE_URL + '/common/feature/add',
    GET_FEATURE_IMAGES_API: BASE_URL + '/common/feature/get',
    DELETE_FEATURE_IMAGE_API: BASE_URL + '/common/feature/delete',
}