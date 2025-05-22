import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth-slice/index';
import adminProductsReducer from './admin/product-slice/index';
import shopProductsReducer from './shop/product-slice/index';
import shopCartReducer from './shop/cart-slice/index';
import shopAddressReducer from './shop/address-slice/index';
import shopOrderReducer from './shop/order-slice/index';
import adminOrderReducer from './admin/order-slice/index';
import shopSearchReducer from './shop/search-slice/index';
import shopReviewReducer from './review-slice/index';
import commonReducer from './common-slice/index';

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer,
        shopProducts: shopProductsReducer,
        shopCart: shopCartReducer,
        address: shopAddressReducer,
        order: shopOrderReducer,
        adminOrder: adminOrderReducer,
        shopSearch: shopSearchReducer,
        review: shopReviewReducer,
        common: commonReducer,
    }
});

export default store;