import { toast } from "react-toastify";

import { apiConnector } from "../apiConnector";

import { setIsSearchLoading, setSearchResults } from "@/store/shop/search-slice";
import { searchProductEndpoints } from "../apis";

const {
    SEARCH_PRODUCT_API,
} = searchProductEndpoints;


// function to call search product api
export async function searchProducts(keyword, dispatch) {
    dispatch(setIsSearchLoading(true));

    try {
        const response = await apiConnector(
            "GET",
            `${SEARCH_PRODUCT_API}/${keyword}`,
        );

        // console.log("SEARCH PRODUCTS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't search for products! Try again later");
        }

        dispatch(setSearchResults(response?.data?.data));
    } catch(err) {
        console.error("SEARCH PRODUCTS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setIsSearchLoading(false));
}