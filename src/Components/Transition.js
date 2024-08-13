import { duration } from '@material-ui/core';
import {delay, motion} from 'framer-motion';

const animation =(variants) => {
    return {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        variants
    }
};
const opacity = {
    initial:{
        opacity:0,
        y: 0,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
    },
    enter: {
        opacity: 1,
        y:0
    },
    exit:{
        opacity:0,
        y: "-30%",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
}
const Transition = (Comp) => {
    return () => (
        <>
            <motion.div
                {...animation(opacity)}
                transition={{ duration: 0.75, ease: "easeInOut", delay: 0 }}
            >
                <Comp />
            </motion.div>
            {/* <motion.div 
                initial={{scaleX:0, opacity: 0}}
                animate={{y:0, opacity:1}}
                exit={{y:"50%",opacity: 0,
                    transition:{
                        duration: 0.25,
                        ease: "easeInOut",
                        delay: 0
                    }
                }}
                transition={{duration:0.75, ease: "easeInOut"}}
            >
            </motion.div> */}
            

            {/* <motion.div
                initial='out'
                animate='end'
                exit='out'
                variants={animation}
            /> */}
            {/* <motion.div
                className = "slide-in"
                initial = {{scaleX:0}}
                animate = {{scaleX:0, opacity:0.5}}
                exit = {{scaleX: 1, opacity:1}}
                transition = {{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
            /> */}


            {/* <motion.div 
                className="slide-out"
                initial = {{scaleX:1}}
                animate = {{scaleX:0}}
                exit = {{scaleX: 0}}
                transition = {{duration: 1, ease: [0.22, 1, 0.36, 1]}}
            /> */}
        </>
    );
};

export default Transition;