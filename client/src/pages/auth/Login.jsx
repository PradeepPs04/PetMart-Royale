import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { loginFormControls } from '@/config/authForm';

// components
import CommonForm from '@/components/common/Form';
import { login } from '@/services/operations/authAPI';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

// initial state for formData state variable
const initialState = {
  email: '',
  password: '',
}

const Login = () => {

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  // function to check if form is filled or not
  const isFormFilled = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== '')
      .every((item) => item);
  }

  // function to login user
  const onSubmit = async (e) => {
    e.preventDefault();

    // check if form is filled or not
    if(!isFormFilled()) {
      toast.error("Please fill all all input fields!", {
        position: 'top-center',
      });
      return;
    }

    // call login api
    await login(formData, dispatch); 
  }

  // function to login as guest
  const handleGuestLogin = async () => {
    const guest_email = process.env.GUEST_EMAIL;
    const guest_password = process.env.GUEST_PASSWORD;

    // crete data
    const guestLoginData = {
      email: guest_email,
      password: guest_password,
    }
    const isGuest = true;

    // call login api
    await login(guestLoginData, dispatch, isGuest); 
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h1>
        </div>

        <CommonForm
          formControls={loginFormControls}
          buttonText={'Sign In'}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        {/* continue as guest button */}
        <Button
          onClick={handleGuestLogin}
          className='w-full bg-white text-black hover:bg-accent cursor-pointer'>
            Continue as guest
        </Button>

        {/* go to sign up page link */}
        <p className='mt-2 text-center'>
            Don't have an account {" "}
            <Link to='/auth/signup' className='font-medium text-primary hover:underline'>Register</Link>
        </p>
    </div>
  )
}

export default Login