import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

// config data
import { addressFormControls } from '@/config/userShop'

// shadcn ui components
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

// components
import AddressCard from './AddressCard'
import CommonForm from '../common/Form'

// APIs
import { addAddress, deleteAddress, editAddress, fetchAllAddresses } from '@/services/operations/addressAPIs'

const initialFormData = {
    address: '',
    city: '',
    pincode: '',
    phone: '',
}

const Address = ({currentSelectedAddress, setCurrentSelectedAddress}) => {

    const [formData, setFormData] = useState(initialFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);

    const dispatch = useDispatch();
    const location = useLocation();

    console.log("path: ", location.pathname.split('/').at(-1));

    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.address);

    // function to add/edit an address
    const handleSubmitAddress = (e) => {
        e.preventDefault();

        // allow upto 2 addresses only 
        if(addressList.length === 2 && !currentEditedId) {
            toast.error("You can add upto 2 addresses only");
            return;
        }

        // check if in edit mode
        if(currentEditedId) {
            // call edit address api
            editAddress(user.id, currentEditedId, formData, dispatch)
            .then((data) => {
                if(data) {
                    // fetch all addresses
                    fetchAllAddresses(user.id, dispatch);
                    
                    // reset states
                    setFormData(initialFormData)
                    setCurrentEditedId(null);
                }
            });
        } else {
            // call add address api
            // if success then call fetch addresses api
            addAddress(
                {
                    ...formData,
                    userId: user.id,
                },
                dispatch
            ).then(data => { 
                if(data) {
                    // fetch all addresses
                    fetchAllAddresses(user.id, dispatch);
                    // reset form data
                    setFormData(initialFormData);
                }
            });
        }
    }

    // function to delete an address
    const handleDeleteAddress = (address) => {
        // call delete address api
        deleteAddress(user.id, address._id, dispatch)
        .then((data) => {
            if(data) {
                // call fetch addresses api
                fetchAllAddresses(user.id, dispatch)
            }
        });
    }

    // function to fill form fields with address data on edit mode
    const handleEditAddress = (address) => {
        setCurrentEditedId(address._id);
        setFormData({
            ...formData,
            address: address.address,
            city: address.city,
            pincode: address.pincode,
            phone: address.phone,
        });
    }

    // to check if form is filled or not
    const isFormFilled = () => {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== '')
            .every((item) => item)
    }

    // fetch all addresses on first render
    useEffect(() => {
        const getAddresses = async () => {
            await fetchAllAddresses(user.id, dispatch);
        }
        getAddresses();
    }, []);

  return (
    <Card>
        {/* heading only for checkout page */}
        {
            location.pathname.split('/').at(-1) === 'checkout' ? (
                <CardHeader className='-mb-6'>
                    <h3 className='font-bold text-lg'>Select Shipping Address</h3>
                </CardHeader>
            ) : null
        }

        <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2'>
            {
                addressList && addressList.length > 0 ? (
                    addressList.map((item) => (
                        <AddressCard 
                            key={item._id}
                            addressInfo={item}
                            handleDeleteAddress= {handleDeleteAddress}
                            handleEditAddress={handleEditAddress}
                            currentSelectedAddress={currentSelectedAddress}
                            setCurrentSelectedAddress={setCurrentSelectedAddress}
                        />
                    ))
                ) : null
            }
        </div>

        <CardHeader>
            <CardTitle>
                {
                    currentEditedId 
                    ? 'Edit Address'
                    : 'Add new address'
                }
            </CardTitle>
        </CardHeader>
        
        {/* address form */}
        <CardContent className='space-y-3'>
            <CommonForm 
                formControls={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId ? 'Save Changes' : 'Add'}
                onSubmit={handleSubmitAddress}
                isButtonDisabled={!isFormFilled()}
            />
        </CardContent>
    </Card>
  )
}

export default Address