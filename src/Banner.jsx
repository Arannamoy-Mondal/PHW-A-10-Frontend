import React, { useEffect, useState } from 'react';
import Campaign from './Campaign';
import SliderButtons from './SliderButtons';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';

const Banner = () => {
    const [campaigns, setCampaigns] = useState([])
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        const fetchData=async()=>{
            const data=await( await fetch("https://phw-a-10-backend.vercel.app/campaign")).json();
            if(data)setLoading(false)
            setCampaigns(data);
        }
        fetchData()
        // fetch("https://phw-a-10-backend.vercel.app/campaign")
        //     .then(res => res.json())
        //     .then(res => setCampaigns(res))
    }, [])
    if(loading){
        return(
            <Loading></Loading>
        )
    }
    return (
        <div className='w-[90%] px-[2%] m-auto my-[25px]'>
            <div className="carousel w-full border-[5px] border-solid border-black p-[10px] rounded-2xl">
                {
                    campaigns.length>0?campaigns.map(campaign =>
                        <div id={`item` + campaign._id} className="carousel-item  w-full items-center">
                            <div className='w-[50%]'>
                            <img
                                src={campaign.url}
                                className="w-[100%] rounded-2xl" />
                            </div>
                            <div className='w-[50%]'>
                                <h1 className="text-center font-bold text-[1.25rem]">{campaign.title}</h1>
                                <div className='flex justify-center'>
                                    <h1 className="w-[90%] text-wrap font-bold text-center">{campaign.description}</h1>
                                </div>
                                <h1 className="flex justify-center font-bold">{ }</h1>
                                <h1 className="text-center font-bold">Minimum donation amount: ${campaign.amount}</h1>
                                <h1 className="text-center font-bold">Organizer name: {campaign.organizerName}</h1>
                                <h1 className="text-center font-bold">{campaign.deadline}</h1>
                                <div className="flex flex-wrap justify-center gap-[10px]">
                                    <NavLink to={`/viewmore/` + campaign._id} className="btn btn-primary text-white">View More</NavLink>
                                    <NavLink to={"/donate/" + campaign._id} className="btn btn-warning text-black">Donate Now</NavLink>
                                </div>
                            </div>
                        </div>
                    ):<div className='flex justify-center w-[100%]'><h1 className='text-2xl font-bold'>No Campaign running now.</h1></div>
                }
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
                <SliderButtons></SliderButtons>
            </div>
        </div>
    );
};

export default Banner;