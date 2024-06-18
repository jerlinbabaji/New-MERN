import React from 'react';
import { Button, Navbar, TextInput,Dropdown,Avatar } from 'flowbite-react';
import { Link ,useLocation} from 'react-router-dom';//use loacation is used to highlight when we place the mouse pointer to about,home,projects,this is activated below by the line <Navbar.Link active={path === "/Home"}>
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Header() {
    const path=useLocation().pathname;
    const {currentUser}=useSelector(state=>state.user)

    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  return (
    <Navbar className='border-b-2 flex justify-between items-center p-4'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Jerlin's
        </span>
        Blog           
      </Link>
      <form className='flex items-center'>
        <TextInput 
          type='text'
          placeholder='Search...'
          className='hidden lg:block'
        />
        <Button className='w-12 h-10 ml-2' color='gray' pill>
          <AiOutlineSearch />
        </Button>
      </form>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
        {/* //nested anchor tags are not possible,it will throw error,that is link within a link is not allowed,so you should add "as={'div}" */}
        <Navbar.Link active={path === "/Home"} as={'div'}>
          <Link to='/Home'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={'div'}>
          <Link to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
