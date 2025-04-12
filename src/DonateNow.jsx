import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Authcontext } from './Authprovider';
import swal from 'sweetalert';
const DonateNow = () => {
    const {user}=useContext(Authcontext)
    const campaign = useLoaderData()
    const [er,setEr]=useState(null)
    const navigate=useNavigate()
    const donate=(e)=>{
        e.preventDefault();
        const form=e.target;
        const dName=form.name.value
        const cTitle=form.title.value
        const cId=campaign._id
        const dEmail=form.email.value
        const dAmount=form.amount.value
        const total=parseInt(campaign.totalDonatedAmount)
        if(parseInt(dAmount)<parseInt(campaign.amount)){
            swal('Sorry!',`Minimum amount is ${campaign.amount}`,'error')
            return;
        }
        console.log(campaign.totalDonatedAmount,"DAmount: ",dAmount,parseInt(campaign.totalDonatedAmount)+parseInt(dAmount));
        
        fetch("https://phw-a-10-backend.vercel.app/donation",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({"cId":cId,"cTitle":cTitle,"dName":dName,"dEmail":dEmail,"dAmount":dAmount})
        }).then(res=>res.json()).then(res=>
        {
            
            console.log(total);
            swal("Successful","","success")
            
            fetch(`https://phw-a-10-backend.vercel.app/campaign/id/${cId}`,{
                method:"PATCH",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({"totalDonatedAmount":total+parseInt(dAmount)})
            }).then(res=>res.json()).then(res=>{
                navigate(`/donate/${campaign._id}`);
            })
        }
        ).catch(er=>swal("Failed",{er},"error"))
    }
    return (
        <div className='flex justify-center'>

            <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box" onSubmit={donate}>
                <img src={campaign.url} alt="" className='w-[250px] h-[250px] mx-auto'/>
                <legend className="fieldset-label">Campaign Title</legend>
                <input type="text" className="input" name="title" id="" value={campaign.title}/>
                <label className="fieldset-label">Your Name</label>
                <input type="text" name="name" className='input' id="" value={user.displayName} />
                <label className="fieldset-label">Your Email</label>
                <input type="email" className="input" placeholder="Email" name="email" value={user.email}/>
                <label className="fieldset-label">Donation Amount:</label>
                <input type="number" name="amount" required id="" className='input' placeholder={`Minimum ${campaign.amount} BDT`}/>
                <input type="number" id="" className='input' placeholder={`Minimum ${campaign.totalDonatedAmount} BDT`}/>
                <button className="btn btn-neutral mt-4">Donate</button>
            </form>
        </div>
    );
};

export default DonateNow;