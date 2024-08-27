import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../Styles/carousel.css';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  
  const sliderVariants = {
    incoming: direction => ({
      x: direction === 'right' ? "100%" : "-100%",
      scale: 1.2,
      opacity: 0
    }),
    active: { x: 0, scale: 1, opacity: 1 },
    exit: direction => ({
      x: direction === 'right' ? "-100%" : "100%",
      scale: 1,
      opacity: 0.2
    })
  }
  const sliderTransition = {
    duration: 0,
    ease: [0.56, 0.03, 0.12, 1.04]
  }
  
  const slidersVariants = {
    hover: {
      scale: 1.2,
    },
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
        <div className="carousel-images">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
                  className="image"
                    key={currentIndex}
                    src={images[currentIndex]}
                    style={{top: 0, left: 0 }}
                    variants={sliderVariants}
                    transition={sliderTransition}
                    initial = 'incoming'
                    // initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                    animate="active"
                    exit="exit"
                    custom={direction}
                />
                </AnimatePresence>
            <div className="slide_direction">
                <motion.div
                    variants={slidersVariants}
                    whileHover="hover"
                    className="left"
                    onClick={handlePrevious}
                >
                    <KeyboardArrowLeftIcon />
                </motion.div>
                <motion.div
                    variants={slidersVariants}
                    whileHover="hover"
                    className="right"
                    onClick={handleNext}
                >
                    <KeyboardArrowRightIcon />
                </motion.div>
            </div>
      </div>
    </div>
  );
};
export default Carousel;