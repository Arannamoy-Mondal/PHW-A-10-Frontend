import React from 'react';
import Banner from './Banner';
import HowToHelpUs from './HowToHelpUs';
import AboutUs from './AboutUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <HowToHelpUs></HowToHelpUs>
        </div>
    );
};

export default Home;