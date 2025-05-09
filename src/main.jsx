import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'
import Authprovider from './Authprovider.jsx'
import Error from './Error.jsx'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import AllCampaign from './AllCampaign.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import CreateCampaign from './CreateCampaign.jsx'
import MyAdvertise from './MyAdvertise.jsx'
import Viewmore from './Viewmore.jsx'
import HowToHelpUs from './HowToHelpUs.jsx'
import Dashboard from './Dashboard.jsx'
import DonateNow from './DonateNow.jsx'
import EditCampaign from './EditCampaign.jsx'
import MyDonation from './MyDonation.jsx'
const router=createBrowserRouter(
  [
    {
      path:"/",
      element: <Root></Root>,
      errorElement: <Error></Error>,
      children:
        [
          {
            path:"/",
            element: <Home></Home>
          },
          {
            path:"/login",
            element: <Login></Login>
          },
          {
            path:"/signup",
            element: <Signup></Signup>
          },
          {
            path:"/all-campaign"
            ,element: <AllCampaign></AllCampaign>
          },
          {
            path:"/create-campaign",
            element: <PrivateRoute>
              <CreateCampaign></CreateCampaign>
            </PrivateRoute>
          },
          {
            path:"/my-advertise",
            element: <PrivateRoute>
              <MyAdvertise></MyAdvertise>
            </PrivateRoute>
          },
          {
            path:"/my-donation",
            element: <PrivateRoute>
              <MyDonation></MyDonation>
            </PrivateRoute>
          },
          {
            path:"/viewmore/:_id",
            loader: ({params})=>fetch(`https://phw-a-10-backend.vercel.app/campaign/id/${params._id}`),
            element: <PrivateRoute>
              <Viewmore></Viewmore>
            </PrivateRoute>
          },
          {
            path:"/howToHelpUs",
            element: <HowToHelpUs></HowToHelpUs>
          },
          {
            path:"/dashboard",
            element: 
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          },
          {
            path:"/donate/:_id",
            loader: ({params})=>fetch(`https://phw-a-10-backend.vercel.app/campaign/id/${params._id}`),
            element:
            <PrivateRoute>
              <DonateNow></DonateNow>
            </PrivateRoute>
          },
          {
            path:"/editCampaign/:id",
            element: <PrivateRoute>
              <EditCampaign></EditCampaign>
            </PrivateRoute>
          }
        ]
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>,
)
