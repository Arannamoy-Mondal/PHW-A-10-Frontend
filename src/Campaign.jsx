import React from 'react';

const Campaign = ({ campaign }) => {
    const { _id,
        title,
        type, description,
        amount, deadline, organizerName, organizerEmail,
        created_time,url
    } = campaign
    return (
        <div className='card bg-base border-[1px] border-solid border-black'>
            <a href="https://imgbb.com/">
            <img src={url} alt="" />
            </a>
            <h1>{title}</h1>
            <h1>{description}</h1>
            <h1>{amount}</h1>
            <h1>{deadline}</h1>
            <h1>{organizerName}</h1>
            <h1>{organizerEmail}</h1>
            <h1>{created_time}</h1>
        </div>
    );
};

export default Campaign;



{/* <a href="https://imgbb.com/">
            <img src="https://i.ibb.co.com/JFQ2yCqj/download.jpg"
 alt="" />
            </a> */}