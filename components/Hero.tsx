'use client';

import Image from 'next/image';
import NavLink from './NavLink';

export default function Hero() {
  return (
    <section>
      <div className='custom-screen sm:pt-56 pt-28 text-gray-600 flex justify-between gap-8 sm:flex-row flex-col'>
        <div className='space-y-5 max-w-4xl mx-auto text-center sm:w-1/2'>
          <button
            className={`border py-2 rounded-2xl hover:bg-gray-100 transition px-5 text-sm text-gray-500 hover:text-gray-600`}
          >
            Used by 2,000+ professionals for career inspiration
          </button>
          <h1 className='text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl'>
            Find the right career for you using AI
          </h1>
          <p className='max-w-xl mx-auto'>
            Explore Careers allows you to explore careers based on your skills
            and interests <span className='font-semibold'>using AI</span> in
            seconds, completely for free.
          </p>
          <div className='flex items-center justify-center gap-x-3 font-medium text-sm'>
            <NavLink
              href='/careers'
              className='text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 '
            >
              Explore alternative careers
            </NavLink>
            <NavLink
              target='_blank'
              href='https://github.com/Nutlope/explorecareers'
              className='text-gray-700 border hover:bg-gray-50'
              scroll={false}
            >
              Learn more
            </NavLink>
          </div>
        </div>
        <div className=''>
          <Image
            src='/careers-screenshot.png'
            className='rounded-2xl border'
            alt='hero'
            width={700}
            height={700}
          />
        </div>
      </div>
    </section>
  );
}
