import React from 'react';
import books from '../assets/shop.png';

const Home = () => {
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2  justify-between items-center px-2 sm:px-6 md:px-12 lg:px-20'>
            <div>
                <p className='text-yellow-600 font-bold text-[50px] font-serif'>Book Shop</p>
                <p className='text-yellow-600 pt-4 text-lg flex'>Browse the collection of our best top interesting <br/> Books. you will definitely find what you are <br/> looking for.</p>
            </div>
            <div>
                <img src={books} alt='' className='min-h-full'/>
            </div>
        </div>
    </div>
  )
}

export default Home