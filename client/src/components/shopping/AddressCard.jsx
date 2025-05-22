import React from 'react'
import { useLocation } from 'react-router-dom'

// shadcn ui components
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

// icons
import { EditIcon, TrashIcon } from 'lucide-react'

const AddressCard = ({addressInfo, handleEditAddress, handleDeleteAddress, currentSelectedAddress,setCurrentSelectedAddress}) => {

    const location = useLocation();
    const page = location.pathname.split('/').at(-1);

  return (
    <Card
        onClick={
            setCurrentSelectedAddress 
                ? () => setCurrentSelectedAddress(addressInfo)
                : null 
        }
        className={`${page === 'checkout' && currentSelectedAddress?._id === addressInfo?._id ? 'outline-2' : 'shadow-none'} cursor-pointer`}
    >
        {/* address details */}
        <CardContent className='grid gap-4 p-4'>
            <Label>
                Address: {addressInfo?.address}
            </Label>

            <Label>
                City: {addressInfo?.city}
            </Label>

            <Label>
                Pincode: {addressInfo?.pincode}
            </Label>

            <Label>
                Phone number:{addressInfo?.phone}
            </Label>
        </CardContent>

        {/* action buttons */}
        <CardFooter className='p-3 flex justify-between'>
            {/* edit button */}
            <Button 
                onClick={() => handleEditAddress(addressInfo)}
                className='flex items-center gap-1 cursor-pointer'
            >
                Edit
                <EditIcon/>
            </Button>

            {/* delete button */}
            <Button
                onClick={() => handleDeleteAddress(addressInfo)}
                className='flex items-center gap-1 cursor-pointer'
            >
                Delete
                <TrashIcon/>
            </Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard