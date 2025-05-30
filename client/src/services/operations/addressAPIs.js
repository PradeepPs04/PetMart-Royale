import { toast } from "react-toastify";

import { apiConnector } from "../apiConnector";
import { addressEndPoints } from "../apis";

import { setAddressList, setAddressLoading } from "@/store/shop/address-slice";


const {
    ADD_ADDRESS_API,
    FETCH_ALL_ADDRESSES_API,
    EDIT_ADDRESS_API,
    DELETE_ADDRESS_API,
} = addressEndPoints;

// function to call add address API
export async function addAddress(data, dispatch) {
    let success = false;
    dispatch(setAddressLoading(true));

    try {
        const response = await apiConnector(
            'POST',
            ADD_ADDRESS_API,
            data,
        );

        // console.log("ADD ADDRESS API response", response);

        if(!response?.data?.success) {
            throw new Error("Can't add address right now! Try again later");
        }

        success = true;
        toast.success(response?.data?.message);
    } catch(err) {
        console.error("ADD ADDRESS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setAddressLoading(false));
    return success;
}

// function to call fetch all addresses API
export async function fetchAllAddresses(userId, dispatch) {
    dispatch(setAddressLoading(true));

    try {
        const response = await apiConnector(
            'GET',
            `${FETCH_ALL_ADDRESSES_API}/${userId}`,
        );

        // console.log("FETCH ALL ADDRESSES API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch addresses now! Try again later");
        }

        // set addresses in redux store
        dispatch(setAddressList(response?.data?.data));
    } catch(err) {
        console.error("FETCH ALL ADDRESSES API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setAddressLoading(false));
}

// function to call edit address API
export async function editAddress(userId, addressId, formData, dispatch) {
    dispatch(setAddressLoading(true));
    let success = false;

    try {
        const response = await apiConnector(
            'PUT',
            `${EDIT_ADDRESS_API}/${userId}/${addressId}`,
            formData,
        );

        // console.log("EDIT ADDRESS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't edit address right now! Try again later");
        }

        success = true;
        toast.success(response?.data?.message);
    } catch(err) {
        console.error("EDIT ADDRESS API API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setAddressLoading(true));

    return success;
}

// function to call delete address API
export async function deleteAddress(userId, addressId, dispatch) {
    dispatch(setAddressLoading(true));
    
    let success = false;

    try {
        const response = await apiConnector(
            'DELETE',
            `${DELETE_ADDRESS_API}/${userId}/${addressId}`,
        );

        // console.log("DELETE ADDRESS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't delete address right now! Try again later");
        }

        success = true;
        toast.success(response?.data?.message);
    } catch(err) {
        console.error("DELETE ADDRESS API API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    dispatch(setAddressLoading(false));

    return success;
}