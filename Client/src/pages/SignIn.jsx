import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cors from 'cors';
import { useDispatch,useSelector} from 'react-redux';
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
 // const [errorMessage, setErrorMessage] = useState(null);
 const { loading, error: errorMessage } = useSelector((state) => state.user);//down in the alert we have used errorMessage ,userSlice me line 5 me jo error likha h vo bhi same kaam karega ,we can access that using the useSelector
const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();//this will prevent the page being refreshed everytime we click on signup
    if (!formData.email || !formData.password) {
      //return setErrorMessage('Please fill out all fields.');//id details are partially filled ,this will appear
      return dispatch(signInFailure('Please fill all the fields'));

    }
    try {
      //instead of setLoading and setErrorMessage we an use the reduc userSlice 'signInstart'
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();    
      if (data.success === false) {
        //instead of this we can use signInFailure,both does the same task
        //return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }
  
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='********'
                id='password'
                onChange={handleChange}
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
                'Sign In'
              )}
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div> 
    </div>
  );
}