import React from 'react';

const Campaign = ({campaign}) => {
    const {_id,username,email,projectName,location,details}=campaign
    return (
        <div className='card bg-base w-[20%] border-[1px] border-solid border-black'>
            <h1>{projectName}</h1>
            <h1>{location}</h1>
            <h1>{details}</h1>
            <h1>{username}</h1>
            <h1>{email}</h1>
        </div>
    );
};

export default Campaign;