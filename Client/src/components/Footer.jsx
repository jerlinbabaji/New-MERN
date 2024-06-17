import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500 bg-gray-900 text-gray-200'>
      <div className='w-full max-w-7xl mx-auto py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {/* Logo and Branding */}
          <div className='mb-8'>
            <Link to='/' className='flex items-center space-x-2 text-xl font-semibold'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Jerlin's
              </span>
              <span className='text-white'>Blog</span>
            </Link>
            <p className='mt-2 text-sm'>Exploring creativity in code.</p>
          </div>

          {/* Links Section */}
          <div className='space-y-4'>
            <Footer.Title title='About' />
            <Footer.LinkGroup col>
              <Footer.Link
                href='https://www.100jsprojects.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                100 JS Projects
              </Footer.Link>
              <Footer.Link
                href='/about'
                target='_blank'
                rel='noopener noreferrer'
              >
                Jerlin's Blog
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Follow Us Section */}
          <div className='space-y-4'>
            <Footer.Title title='Follow us' />
            <Footer.LinkGroup col>
              <Footer.Link
                href='https://www.github.com/jerlinbabaji'
                target='_blank'
                rel='noopener noreferrer'
              >
                Github
              </Footer.Link>
              <Footer.Link href='#'>Discord</Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Legal Section */}
          <div className='space-y-4'>
            <Footer.Title title='Legal' />
            <Footer.LinkGroup col>
              <Footer.Link href='#'>Privacy Policy</Footer.Link>
              <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider className='my-8' />

        {/* Social Icons */}
        <div className='flex items-center justify-center space-x-6'>
          <Footer.Icon href='#' icon={BsFacebook} className='text-2xl text-blue-500 hover:text-blue-600 transition-colors duration-300' />
          <Footer.Icon href='#' icon={BsInstagram} className='text-2xl text-pink-500 hover:text-pink-600 transition-colors duration-300' />
          <Footer.Icon href='#' icon={BsTwitter} className='text-2xl text-blue-400 hover:text-blue-500 transition-colors duration-300' />
          <Footer.Icon href='https://github.com/jerlinbabaji' icon={BsGithub} className='text-2xl text-gray-600 hover:text-gray-700 transition-colors duration-300' />
          <Footer.Icon href='#' icon={BsDribbble} className='text-2xl text-pink-600 hover:text-pink-700 transition-colors duration-300' />
        </div>

        {/* Copyright */}
        <div className='flex items-center justify-center mt-8 text-sm'>
          <p>&copy; {new Date().getFullYear()} Jerlin's Blog. All rights reserved.</p>
        </div>
      </div>
    </Footer>
  );
}
