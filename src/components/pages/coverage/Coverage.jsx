import React from 'react';
import BangladeshMap from './BangladeshMap';

const Coverage = () => {
    return (
        <div className='max-w-4xl mx-auto px-4 py-10'>
            <h1 className='text-3xl font-bold mb-6'> We are available in 64 districts </h1>
           <BangladeshMap></BangladeshMap>
        </div>
    );
};

export default Coverage;