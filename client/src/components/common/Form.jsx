import React from 'react'

// constants
import { inputTypes } from '@/constants';

// shadcn ui components
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({formControls, formData, setFormData, onSubmit, buttonText, isButtonDisabled}) => {

    const renderInput = (item) => {
        let element = null;
        const value = formData[item.name] || ''; 

        switch (item.componentType) {
            case inputTypes.INPUT:
                element = (
                    <Input 
                        name={item.name}
                        placeholder={item.placeholder}
                        id={item.name}
                        type={item.type}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [item.name]:e.target.value
                        })}
                    />
                );
                break;

            case inputTypes.SELECT:
                element = (
                    <Select 
                        onValueChange={(value) => setFormData({
                            ...formData,
                            [item.name]:value
                        })} 
                        value={value}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={item.label}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                item?.options && 
                                item?.options?.length > 0 ? (
                                    item.options.map((option) => (
                                        <SelectItem 
                                            key={option.id} 
                                            value={option.id}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))
                                ) : null
                            }
                        </SelectContent>
                    </Select>
                );
                break;

            case inputTypes.TEXTAREA:
                element = (
                    <Textarea
                        name={item.name}
                        placeholder={item.placeholder}
                        id={item.id}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [item.name]:e.target.value
                        })}
                    />
                );
                break;
            default: 
                element = (
                    <Input 
                        name={item.name}
                        placeholder={item.placeholder}
                        id={item.name}
                        type={item.type}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [item.name]:e.target.value
                        })}
                    />
                );
        }

        return element;
    }

  return (
    <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-3'>
            {
                formControls.map((item) => (
                    <div 
                        key={item.id}
                        className='grid w-full gap-1.5'
                    >   
                        {/* label */}
                        <Label className='mb-1'>{item.label}</Label>
                        {/* input box */}
                        { renderInput(item) }
                    </div>
                ))
            }
        </div>

        <Button
            type='submit'
            disabled={isButtonDisabled}
            className='mt-2 w-full cursor-pointer'
        >
            {buttonText || 'Submit'}
        </Button>
    </form>
  )
}

export default CommonForm