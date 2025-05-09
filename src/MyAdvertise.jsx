import React, { use, useContext, useEffect, useState } from 'react';
import { Authcontext } from './Authprovider';
import Campaign from './Campaign';
import { NavLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from './Loading';
const MyAdvertise = () => {
    const { user } = useContext(Authcontext)
    const [campaigns, setCampaigns] = useState([])
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true)
    const fetchData=async()=>{
        const data=await(await 
            fetch(`https://phw-a-10-backend.vercel.app/campaign/email/${user.email}`)).json();
        if(data)setLoading(false)
        setCampaigns(data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const updateData = () => {
        fetchData()
    }
    updateData()
    const deleteCampaign = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    fetch(`https://phw-a-10-backend.vercel.app/campaign/id/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.deletedCount > 0) {
                                swal("Deleted!", "Your imaginary file has been deleted!", "success");
                                updateData()
                            }
                        })
                        .catch(err => {
                            swal("Failed!", "Please try later", "error");
                        })
                }
            });
    }


    const no_campaign_popup=()=>{
        // if(campaigns.length==0){
        //     swal({
        //         title: "Sorry! Currently, you have no campaign.",
        //         text: "Are you want to create any campaign?",
        //         icon: "error",
        //         dangerMode: true,
        //     }).then(will_delete=>{
        //         if(will_delete){
        //             navigate("/create-campaign")
        //         }
        //         else{
        //         navigate("/")
        //         }
        //     })
        // }
    }
    if(loading){
        return(
            <Loading></Loading>
        )
    }
    return (
        <div className="flex justify-evenly flex-wrap w-full gap-[10px] mt-[50px] mb-[450px]">
            {
                campaigns.length>0?campaigns.map(
                    campaign =>
                        <div className='flex w-[90%] flex-col lg:flex-row lg:flex-wrap p-[15px] items-center border-[2px] border-solid border-black'>


                            <div className='p-[10px] lg:w-[20%] flex justify-center'>
                                <img src={campaign.url ? campaign.url : "./No.png"} alt="" className='w-[150px] h-[150px]' />
                            </div>

                            <div className='lg:w-[30%] '>
                                <h1 className='text-center text-wrap'>{campaign.title}</h1>
                                <h1 className='text-center text-wrap'>{campaign.description}</h1>
                                <h1 className='text-center text-wrap'>Minimum Donate: Amount: ${campaign.amount}</h1>
                                <h1 className='text-center text-wrap'>Type: {campaign.type}</h1>
                            </div>
                            <div className='lg:w-[30%] '>
                                <h1 className='text-center text-wrap'>Minimum Donate: Amount: ${campaign.amount}</h1>
                                <h1 className='text-center text-wrap'>Deadline: {campaign.deadline}</h1>
                                <h1 className='text-center text-wrap'>Created time: {campaign.created_time}</h1>
                            </div>
                            <div className='lg:w-[20%] flex justify-center gap-[10px]'>
                                <NavLink to={`/editCampaign/${campaign._id}`} className={"btn btn-warning text-white font-bold"}>Edit</NavLink>
                                <NavLink className={"btn btn-error text-white font-bold"} onClick={() => deleteCampaign(campaign._id)}>Delete</NavLink>
                            </div>
                        </div>
                ): <div><h1 className='text-[2rem] font-bold'>You have no campaign.</h1></div>
            }
        </div>
    );
};

export default MyAdvertise;