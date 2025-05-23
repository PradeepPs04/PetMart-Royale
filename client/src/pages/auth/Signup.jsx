import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { signUpFormControls } from '@/config/authForm';

// components
import CommonForm from '@/components/common/Form';

// APIs
import { signup } from '@/services/operations/authAPI';
import { setLoading } from '@/store/auth-slice';

// initial state for formData state variable
const initialState = {
  userName: '',
  email: '',
  password: '',
}

const Signup = () => {

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();

    // call signup API
    dispatch(setLoading(true));
    const success = await signup(formData);
    dispatch(setLoading(false));

    // on success redirect to login page
    if(success) {
      navigate('/auth/login');
    }
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground text-center'>
            Create new account
          </h1>

        <CommonForm
          formControls={signUpFormControls}
          buttonText={'Sign Up'}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        <p className='mt-2 text-center'>
            Already have an account {" "}
            <Link to='/auth/login' className='font-medium text-primary hover:underline'>Login</Link>
        </p>
    </div>
  )
}

export default Signup