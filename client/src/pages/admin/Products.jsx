import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// shadcn ui components
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

// icons
import { Plus } from 'lucide-react'

// data for form inputs
import { addProductFormElements } from '@/config/adminDashboard'

// components
import ProductImageUpload from '@/components/admin/ImageUpload'
import AdminProductTile from '@/components/admin/ProductTile'
import CommonForm from '@/components/common/Form'

// skeleton component
import ProductsSekeleton from '@/components/skeleton/admin/ProductsSekeleton'

// APIs
import { createProduct, deleteProduct, editProduct, fetchAllProducts } from '@/services/operations/adminAPIs'
import PaginationWrapper from '@/components/common/PaginationWrapper'

// initial form data state
const initialState = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};

const AdminProducts = () => {

  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentEditId, setCurrentEditId] = useState(null);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;


  const { isLoading, products } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();


  // handles creating new product
  const onSubmit = (e) => {
    e.preventDefault();

    // create form data
    const data = {
      ...formData,
      file: imageFile,
    }
    
    // check if edit mode
    if(currentEditId) {
      // call edit product api
      editProduct(currentEditId, data)
      .then((response) => {
        if(response) {
          // fetch all products
          fetchAllProducts(dispatch);
          // reset form input fields
          setImageFile(null);
          setFormData(initialState);
          // hide produce dialog box
          setOpenCreateProductDialog(false);
        }
      });
    } else {
      // call create product api
      createProduct(data, dispatch)
      .then((response) => {
        if(response) {
          // fetch all products
          fetchAllProducts(dispatch);
          // reset form input fields
          setImageFile(null);
          setFormData(initialState);
          // hide produce dialog box
          setOpenCreateProductDialog(false);
        }
      });
    }
  }

  // function to delete a product
  const handleDelete = (productId) => {
    deleteProduct(productId)
    .then((response) => {
      if(response) {
        fetchAllProducts(dispatch);
      }
    })
  }

  // to disable submit button on form (if form isn't filled)
  const isFormValid = () => {
    // check if all input fields are filled
    const allInputsFilled = Object.keys(formData)
      .map(key => formData[key] !== '')
      .every(item => item);

    // check if image is avialable or not
    const imageAvailable = (imageFile || imagePreview) ? true : false;

      return (imageAvailable && allInputsFilled);
  }

  // fetch all products on first render
  useEffect(() => {
    const fetchProducts = async () => {
      await fetchAllProducts(dispatch);
    }
    fetchProducts();
  }, []);


  // if loading dispaly skeleton loader
  if(isLoading) {
    return <ProductsSekeleton/>
  }

  return (
    <Fragment> 

      {/* add product button */}
      <div className='mb-5 flex justify-end'>
        <Button 
          onClick={() => {
            setOpenCreateProductDialog(true)
            setCurrentEditId(null);
            setImagePreview(null);
            setFormData(initialState);

          }}
          className='flex gap-2 items-center cursor-pointer'
        >
          <span>Add New Product</span>
          <Plus/>
        </Button>
      </div>

      {/* products */}
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {
          products && products?.length > 0 
          ? (
            [...products]
              .slice((currentPage-1)*itemsPerPage, (currentPage)*itemsPerPage)
              .map((product, idx) => (
                <AdminProductTile 
                  key={idx}
                  product={product}
                  setCurrentEditId={setCurrentEditId}
                  setOpenCreateProductDialog={setOpenCreateProductDialog}
                  setFormData={setFormData}
                  setImagePreview={setImagePreview}
                  handleDelete={handleDelete}
                />
              ))
            ) : null
        }
      </div>

      {/* add product dialog */}
      <Sheet 
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditId(null);
          setImagePreview(null);
          setFormData(initialState);
        }}
      >
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>
              {
                currentEditId ? 'Edit Product'
                : 'Add New Product'
              }
            </SheetTitle>
          </SheetHeader>

          {/* product image uploader */}
          <div className='px-6'>
            <ProductImageUpload
              file={imageFile}
              setFile={setImageFile}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>

          <div className='p-6'>
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditId ? 'Save Changes' : 'Add'}
              onSubmit={onSubmit}
              isButtonDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Pagination */}
      <section className='my-12'>
        <PaginationWrapper
          totalItems={products?.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>

    </Fragment>
  )
}

export default AdminProducts