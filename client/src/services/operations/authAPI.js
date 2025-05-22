import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";

// redux store slices
import { setIsAuthenticated, setUser } from "@/store/auth-slice";


const {
    SIGNUP_API,
    LOGIN_API,
    LOGOUT_API,
    CHECKAUTH_API,
} = authEndpoints;


// function to call signup api
export async function signup(formData) {
    const toastId = toast.loading("Loading...");
    let success = false;
    try {
        const response = await apiConnector(
            'POST',
            SIGNUP_API,
            formData,
        );

        console.log("SIGNUP API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't sign up right now try again later");
        }

        success = true;
        toast.success(response?.data?.message);
    } catch(err) {
        console.error("SIGNUP API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    return success;
}

// function to call login api
export async function login(formData, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            'POST',
            LOGIN_API,
            formData,
        );

        console.log("LOGIN API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't log in right now try again later");
        }

        // set states in auth slice
        dispatch(setUser(response?.data?.user));
        dispatch(setIsAuthenticated(true));

        toast.success(response?.data?.message);
    } catch(err) {
        console.error("LOGIN API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
}

// function to call check authentication api
export async function checkAuth(dispatch) {
    try {
        const response = await apiConnector(
            'GET',
            CHECKAUTH_API,
            {},
            // header
            {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                Expires: '0',
            }
        );

        console.log("CHECK AUTH API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't authenticate user try again later");
        }

        // set states is auth slice
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(response?.data?.user));

    } catch(err) {
        console.error("CHECK AUTH API error...", err);
    }
}

// function to call logout api
export async function logout(dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector('POST', LOGOUT_API);

        console.log("LOGOUT API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't logout! Try again later");
        }

        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
        toast.success('Logged out successfully');
    } catch(err) {
        console.error("LOGOUT API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }
    
    toast.dismiss(toastId);
}