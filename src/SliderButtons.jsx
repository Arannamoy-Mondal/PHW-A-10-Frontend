import React, { useEffect, useState } from 'react';

const SliderButtons = () => {
    const [campaigns, setCampaigns] = useState([])
    useEffect(() => {
        fetch("https://phw-a-10-backend.vercel.app/campaign")
            .then(res => res.json())
            .then(res => setCampaigns(res))
    }, [])

    return (
        <div>
            <div className='flex gap-[5px] flex-wrap justify-center'>
                {
                    campaigns.map(el =>
                        <a href={`#item` + el._id} className='btn btn-outline'>{el.title}</a>
                    )
                }
            </div>
        </div>
    );
};

export default SliderButtons;