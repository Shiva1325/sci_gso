import React from 'react';
import Transition from './Transition';
import "../Styles/about.css";
import Card from './Card';
import {properties} from "./MembersData/data"

const About = () => {
    return (
        <div className='about-container'>
            <div className='about-header'>
                <h2>
                    About Us
                </h2>
                <span>
                    <p>
                    Welcome to the Graduate Student Organization (GSO) of the School of Computing and Information at the University of Pittsburgh! Our GSO is a vibrant community of passionate graduate students dedicated to fostering academic excellence, professional development, and social engagement.
                    </p>
                    <p>
                    At the heart of our organization is a commitment to enriching the graduate experience through diverse opportunities for collaboration, learning, and growth. We actively organize events, workshops, and seminars that connect students with industry leaders, faculty, and peers, empowering them to excel in their fields and expand their horizons. 
                    </p>
                    <p>
                    Our mission is to create an inclusive and supportive environment where every student can thrive. We strive to represent the diverse interests and needs of our members, advocating for their welfare and fostering a sense of belonging. Whether you're seeking academic support, networking opportunities, or a friendly community to share your journey, the GSO is here for you.
                    </p>
                    <h5>Join us in shaping the future of computing and information. Together, we can make a difference!</h5>
                </span>
            </div>
            <div className='about-section'>
                <div className='section-header'>
                    <h3> Meet the Officers</h3>
                </div>
                <div className='section-content'>
                <div className="properties">
                    {properties.map((item) => (
                        <Card data={item} key={item.id} />
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Transition(About);