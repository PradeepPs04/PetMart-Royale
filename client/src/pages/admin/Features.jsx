import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

// constants
import { userRoles } from '@/constants';

// components
import ProductImageUpload from '@/components/admin/ImageUpload';

// skeleton component
import FeaturesSkeleton from '@/components/skeleton/admin/FeaturesSkeleton';

// shadcn ui components
import { Button } from '@/components/ui/button';

// APIs
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from '@/services/operations/featureImageAPI';
import { Separator } from '@/components/ui/separator';


const AdminFeatures = () => {

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();

  const { isLoading, featureImageList } = useSelector(state => state.common);
  const { user } = useSelector(state => state.auth);

  // function to upload feature image
  const hanldeImageUpload = async () => {
    if(!imageFile) {
      toast.error("Please select a file");
      return;
    }

    // check if on admin demo account
    if(user?.role === userRoles.DEMO_ADMIN) {
      toast.error("Can't do this on demo account");
      return;
    }

    // call api
    const result = await addFeatureImage(imageFile);

    // reset states & fetch all feature image
    if(result) {
      setImageFile(null);
      setImagePreview(null);
      // call fetch all feature images api
      await getFeatureImages(dispatch);
    }
  }

  // function to delete feature image
  const handleDelete = (item) => {
    // call delete feature image api
    deleteFeatureImage(item._id)
    .then(result => {
      if(result) {
        // call fetch all feature images api
        getFeatureImages(dispatch);
      }
    })
  }

  // fetch feature images at first render
  useEffect(() => {
    const fetchFeatureImages = async () => {
      await getFeatureImages(dispatch);
    }
    fetchFeatureImages();
  }, []);

  
  // if loading display skeleton loader
  if(isLoading) {
    return <FeaturesSkeleton/>
  }

  return (
    <div className='flex flex-col items-center gap-6'>
          {/* image container */}
          <ProductImageUpload
            setFile={setImageFile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            isCustomStyling={true}
          />

          {/* upload button */}
          <Button 
            className='cursor-pointer'
            onClick={hanldeImageUpload}
          >
            Upload
          </Button>

          <Separator/>

          {/* feature images */}
          <div className='flex flex-col gap-4 w-full mt-4'>
            {
              featureImageList && featureImageList.length > 0 ? (
                featureImageList.map(item => (
                  <div className='flex flex-col items-center gap-2'>
                    {/* banner image */}
                    <img
                      key={item._id}
                      src={item.image}
                      loading='lazy'
                      className='w-[80%] mx-auto max-h-[500px] object-cover rounded-lg'
                    />

                    {/* delete button */}
                    <Button 
                      onClick={() => handleDelete(item)}
                      className='bg-red-500 hover:bg-red-600 cursor-pointer'
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : null
            }
          </div>
    </div>
  )
}

export default AdminFeatures