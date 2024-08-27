import React from 'react';
import '../Styles/home.css';
import Transition from './Transition';
// import PittBackgroundImage from '../Images/Pitt_Panaroma.jpeg';
import PittBackgroundImage from '../Images/SCI-GSO_Home_Image.png';
// import PittBackgroundImage from '../Images/SCI-GSO_Home_Image_Exposed.png';
import { useTypedDepartments } from './Type-Writing-Animation';
// import PittShieldImage from '../Images/P_Icon_Pitt.png';
import { motion } from 'framer-motion';
const Home = () => {
    const CurrDepartmenttoType = ['Computer Science', 'Information Science', 'Intelligent Systems', 'Data Science', 'Library and Information Science', 'Telecommunications'];
    const department = useTypedDepartments(CurrDepartmenttoType);
    return (
        <div className='header'>
            <div className='header-container' >
                    <motion.div className='header-section'
                        initial={{y:"-50%", opacity: 0}}
                        animate={{y:0, opacity:1}}
                        exit={{y:"-50%",opacity: 0,
                            transition:{
                                duration: 0.3,
                                ease: "easeInOut",
                                delay: 0
                            }
                        }}
                        transition={{duration:0.3, ease: "easeInOut"}}
                    >
                        <div className='header-background-img'>
                            {/* <img src={PittBackgroundImage} alt='Cathedral Image' /> */}
                        </div>
                        <div className='header-content'>
                            <div className='DeptInfoDiv'>
                                {/* <div>
                                        <img className='PittShieldImage' src={PittShieldImage} />
                                    </div> */}
                                <div className='UniversityNameDiv'>
                                    <h2> University of </h2>
                                    <h2>&nbsp;Pittsburgh</h2>
                                </div>
                                <div className='schoolInfo'>
                                    <h3>School of Computing and Information</h3>
                                </div>
                            </div>
                            <div className='GSOName'>
                                <span>Graduate Student Organization</span>
                            </div>
                            <div className='Display-All-Depts'>
                                <span className='blinking-cursor'>{department}</span>
                            </div>
                        </div>
                    </motion.div>
            </div>
            {/* <div className='home-content'>
                
            </div> */}
        </div>
        
    );
    
}

export default Transition(Home);