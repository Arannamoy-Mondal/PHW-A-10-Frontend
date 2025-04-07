import React, { useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Authcontext } from './Authprovider';
import Loading from './Loading';


const Root = () => {
    const { loading } = useContext(Authcontext)
    if (loading) {
        <Loading></Loading>
        return
    }
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;