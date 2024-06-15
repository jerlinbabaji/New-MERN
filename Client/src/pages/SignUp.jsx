import React, { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Add your form submission logic here
    // Once done, set loading to false
    setTimeout(() => setLoading(false), 2000); // simulate loading
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Jerlin's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <Label htmlFor='username'>Your username</Label>
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                className='mt-1'
              />
            </div>
            <div className='mb-4'>
              <Label htmlFor='email'>Your email</Label>
              <TextInput
                type='email'
                placeholder='xxxxxxx@gmail.com'
                id='email'
                className='mt-1'
              />
            </div>
            <div className='mb-4'>
              <Label htmlFor='password'>Your password</Label>
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                className='mt-1'
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
