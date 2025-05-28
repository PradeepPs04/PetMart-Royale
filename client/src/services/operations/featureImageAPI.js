import { toast } from "react-toastify";

import { apiConnector } from "../apiConnector";
import  { featureImageEndpoints } from "../apis";
import { setFeatureImageList, setLoading } from "@/store/common-slice";

const {
    ADD_FEATURE_IMAGE_API,
    GET_FEATURE_IMAGES_API,
    DELETE_FEATURE_IMAGE_API,
} = featureImageEndpoints;

// function to call add feature image api
export async function addFeatureImage(image) {
    const toastId = toast.loading("Uploading...");
    let result = null;

    try {
        const response = await apiConnector(
            'POST',
            ADD_FEATURE_IMAGE_API,
            {image},
            {'Content-Type': 'multipart/form-data'},
        );

        console.log("ADD FEATURE IMAGE API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't add feature image! Try again later");
        }

        result = response?.data?.data;
        toast.success(response?.data?.message);
    } catch(err) {
        console.error("ADD FEATURE IMAGE API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return result;
}

// function to call get feature image api
export async function getFeatureImages(dispatch) {
    dispatch(setLoading(true));

    try {
        const response = await apiConnector(
            'GET',
            GET_FEATURE_IMAGES_API,
        );

        console.log("GET FEATURE IMAGES API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch feature images! Try again later");
        }

        // set data in store
        dispatch(setFeatureImageList(response?.data?.data));
    } catch(err) {
        console.error("GET FEATURE IMAGES API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setLoading(false));
}

// function to call delete feature image api
export async function deleteFeatureImage(featureId) {
    const toastId = toast.loading("Deleting...");

    let success = false;

    try {
        const response = await apiConnector(
            "DELETE",
            `${DELETE_FEATURE_IMAGE_API}/${featureId}`,
        );

        console.log("DELETE FEATURE IMAGE API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't delte feature image! Try again later");
        }

        toast.success(response?.data?.message);
        success = true;
    } catch(err) {
        console.error("DELETE FEATURE IMAGE API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return success;
}