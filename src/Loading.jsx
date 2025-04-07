import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center mt-[250px]'>
            <div className='flex flex-wrap justify-center'>
                <span className="loading loading-spinner text-primary w-[450px]"></span>
            </div>
        </div>
    );
};

export default Loading;