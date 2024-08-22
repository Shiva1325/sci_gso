import React from 'react';
import "../Styles/loading.css";
import { motion } from 'framer-motion';
import LoadingIcon from "../Images/Loading_Icon.png"

const Loading = () => {
    const loadingVariant = {
        animate: {
            rotate: [0, 360],
            transition: {
                repeat: Infinity,
                duration: 1,
                ease: "linear"
            }
        }
    };

    return (
        <div className="loading-container">
            <motion.div className="loadingtextandimage">
                <motion.img
                    className="loading-icon" 
                    variants={loadingVariant} 
                    animate="animate"
                    src={LoadingIcon} 
                    alt="Loading" 
                />
            <span>Loading...</span>
            </motion.div>
        </div>
    );
};

export default Loading;
