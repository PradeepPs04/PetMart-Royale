import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { loginFormControls } from '@/config/authForm';

// components
import CommonForm from '@/components/common/Form';
import { setLoading } from '@/store/auth-slice';
import { login } from '@/services/operations/authAPI';

// initial state for formData state variable
const initialState = {
  email: '',
  password: '',
}

const Login = () => {

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    // call login api
    dispatch(setLoading(true));
    await login(formData, dispatch); 
    dispatch(setLoading(false));
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h1>

          <p className='mt-2'>
            Don't have an account {" "}
            <Link to='/auth/signup' className='font-medium text-primary hover:underline'>Register</Link>
          </p>
        </div>

        <CommonForm
          formControls={loginFormControls}
          buttonText={'Sign In'}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
    </div>
  )
}

export default Login