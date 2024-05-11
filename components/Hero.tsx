'use client';

import NavLink from './NavLink';

export default function Hero() {
  return (
    <section>
      <div className='custom-screen sm:pt-56 pt-28 text-gray-600'>
        <div className='space-y-5 max-w-4xl mx-auto text-center'>
          <button
            className={`border py-2 rounded-2xl hover:bg-gray-100 transition px-5 text-sm text-gray-500 hover:text-gray-600`}
          >
            Built during the Llama-3 hackathon in SF
          </button>
          <h1 className='text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl'>
            Explore the right careers
            <div>for you in seconds</div>
          </h1>
          <p className='max-w-xl mx-auto'>
            ExploreCareers makes it simple for you to explore careers to
            transition to based on your skills and interests, completely for
            free.
          </p>
          <div className='flex items-center justify-center gap-x-3 font-medium text-sm'>
            <NavLink
              href='/start'
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
      </div>
    </section>
  );
}
