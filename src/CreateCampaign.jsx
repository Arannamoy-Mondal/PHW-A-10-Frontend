import React, { useContext } from 'react';
import swal from 'sweetalert';
import { Authcontext } from './Authprovider';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
const CreateCampaign = () => {
    
    const { user } = useContext(Authcontext)
    const navigate=useNavigate();
    const createCampaign = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const type = form.type.value
        const description = form.description.value
        const amount = form.amount.value
        const deadline = form.deadline.value
        const organizerName = form.organizerName.value
        const organizerEmail = form.organizerEmail.value
        const created_time = Date()
        const url=form.url.value
        
        // console.log(title, type, description, amount, deadline, organizerName, organizerEmail, created_time);

        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to create this campaign?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    fetch("https://phw-a-10-backend.vercel.app/campaign", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({ title, type,url, description, amount, deadline, organizerName, organizerEmail, created_time,"totalDonatedAmount":0 })
                    }).then(res => res.json()).then(res => {
                        if (res.acknowledged) {
                            swal("Congratulations !", "Campaign create successfully.", "success")
                            .then(()=>{
                               navigate("/all-campaign")
                            })
                        }
                    })
                }
            });
    }
    // console.log(user);
    return (
        <div>
            <h1 className='text-center lg:text-[2rem] font-bold'>Create Campaign</h1>
            <div className='flex justify-center'>
                <form onSubmit={createCampaign} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                    <label className="fieldset-label">Campaign Title</label>
                    <input required name="title" type="text" className="input" placeholder="Campaign title" />
                    <label className="fieldset-label">Campaign type</label>
                    <div required className="dropdown dropdown-bottom dropdown-end">
                        <select name="type" id="type" required className='text-[1.25rem] p-[10px] rounded-2xl border-[1px] border-solid border-black'>
                            <option value=""> Select</option>
                            <option value="Personal issue"> Personal issue</option>
                            <option value="Startup">Startup</option>
                            <option value="Business">Business</option>
                            <option value="Creative ideas">Creative ideas</option>
                            <option value="Non Profit">Non Profit</option>
                            <option value="Save Humanity">Save Humanity</option>
                        </select>
                    </div>

                    <label className="fieldset-label">Campaign Description</label>
                    <input required name="description" type="text" className="input" placeholder="Campaign Description" />
                    <label className="fieldset-label">Minimum donation amount</label>
                    <input required name="amount" type="number" className="input" placeholder="Minimum donation amount in USD" />
                    <label className="fieldset-label">Deadline (Date)</label>
                    <input required name="deadline" type="datetime-local" className="datetime-local text-xl border-[1px] border-solid border-black p-[5px]" placeholder="Campaign Description" />
                    <label className="fieldset-label">Image URL</label>
                    <input required name="url" type="url" className="input" placeholder="Image URL" />
                    <label className="fieldset-label">Campaign organised By</label>
                    <input type="text" name='organizerName' className="input" placeholder={'Organizer name'} value={user.displayName} required />
                    <label className="fieldset-label">Campaign organizer Email</label>
                    <input type="text" name="organizerEmail" className="input" placeholder={user.email} value={user.email} />
                    <button className="btn btn-neutral mt-4">Add Campaign</button>
                </form>
            </div>
            
        </div>
    );
};

export default CreateCampaign;



// value="https://i.ibb.co.com/JFQ2yCqj/download.jpg"