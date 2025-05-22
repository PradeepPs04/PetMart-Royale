import React, { useEffect, useRef } from 'react'

// shadcn ui components
import { Label } from '../ui/label'
import { Input } from '../ui/input'

// icons
import { FileIcon, UploadCloud, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
 
const ProductImageUpload = ({
    file,
    setFile,
    imagePreview,
    setImagePreview,
    isCustomStyling=false,
}) => {

    const inputRef = useRef(null);

    const handleImageFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile) {
            setFile(selectedFile); 
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    }

    const handleDrgOver = (e) => {
        e.preventDefault();
    }
    
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if(droppedFile) {
            setFile(droppedFile);
            setImagePreview(URL.createObjectURL(droppedFile));
        }
    }

    const handleRemoveImage = (e) => {
        setFile(null);
        if(inputRef.current) {
            inputRef.current.value = '';
            setImagePreview(null);
        }
    }

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}>
        <Label className='text-lg font-semibold mb-2 block '>Upload Image</Label>

        <div 
            onDragOver={handleDrgOver}
            onDrop={handleDrop}
            className='border-2 border-dashed rounded-lg p-4'
        >
            <Input 
                ref={inputRef} 
                onChange={handleImageFileChange}
                id='imageUpload' 
                type='file' 
                className='hidden'
            />
            {
                !imagePreview ? (
                    <Label 
                        htmlFor='imageUpload'
                        className='flex flex-col items-center justify-center h-56 cursor-pointer'
                    >
                        <UploadCloud className='w-10 h-10 text-muted-foreground mb-2'/>
                        <span>Drag & drop or click to upload image</span>
                    </Label>
                ) : (
                    <div className='flex items-center justify-between'>
                        <div> </div>
                        {
                            imagePreview && (<img src={imagePreview} className={`max-w-[90%] ${isCustomStyling ? 'max-h-[500px]' : 'h-56'}`}/>)
                        }

                        <Button 
                            variant='ghost'
                            size='icon'
                            onClick={handleRemoveImage}
                            className='text-muted-foreground hover:text-foreground'
                        >
                            <XIcon className='w-4 h-4'/>
                            <span className='sr-only'>Remove File</span>
                        </Button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ProductImageUpload