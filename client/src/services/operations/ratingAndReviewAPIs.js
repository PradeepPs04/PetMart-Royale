import { setIsReviewLoading, setReviews } from "@/store/review-slice";
import { toast } from "react-toastify";

import { apiConnector } from "../apiConnector";
import { reviewProductEndpoints } from "../apis";

const {
    ADD_REVIEW_API,
    GET_REVIEWS_API,
} = reviewProductEndpoints;


// function to call add a review api
export async function addReview(data, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setIsReviewLoading(true));

    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            ADD_REVIEW_API,
            data,
        );

        console.log("ADD REVIEW API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't add review! Try again later");
        }

        toast.success(response?.data?.message);
        result = response?.data?.data;
    } catch(err) {
        console.error("ADD REVIEW API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setIsReviewLoading(false));
    toast.dismiss(toastId);

    return result;
}

// function to call fetch all review api
export async function getReviews(productId, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setIsReviewLoading(true));

    try {
        const response = await apiConnector(
            "GET",
            `${GET_REVIEWS_API}/${productId}`,
        );

        console.log("GET REVIEWS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch reviews! Try again later");
        }

        // set reviews in store
        dispatch(setReviews(response?.data?.data));
    } catch(err) {
        console.error("GET REVIEWS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setIsReviewLoading(false));
    toast.dismiss(toastId);
}