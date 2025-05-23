import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

// components
import ProductImageUpload from '@/components/admin/ImageUpload';

// shadcn ui components
import { Button } from '@/components/ui/button';

// APIs
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from '@/services/operations/featureImageAPI';
import { Separator } from '@/components/ui/separator';

const AdminFeatures = () => {

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();

  const { featureImageList } = useSelector(state => state.common);

  const hanldeImageUpload = async () => {
    if(!imageFile) {
      toast.error("Please select a file");
      return;
    }

    // call api
    const result = await addFeatureImage(imageFile, dispatch);

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
    deleteFeatureImage(item._id, dispatch)
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

  return (
    <div className='flex flex-col items-center gap-6'>
          {/* image container */}
          <ProductImageUpload
            file={imageFile}
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
                    <img
                      key={item._id}
                      src={item.image}
                      loading='lazy'
                      className='w-[80%] mx-auto max-h-[500px] object-cover rounded-lg'
                    />

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