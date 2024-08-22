import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const ResourcesAccordion = ({ i, expanded, setExpanded, title, description }) => {
  const isOpen = i === expanded;

  return (
    <div className="accordion-item">
      <motion.div
        onClick={() => setExpanded(isOpen ? null : i)}
        className="accordion-header"
        initial={false}
        animate={{ backgroundColor: isOpen ? "#e0e0e0" : "#f7f7f7" }}
        transition={{ duration: 0.3 }}
      >
        <h3 className='accordion-title'>{title}</h3>
        <div className="icon-container">
          <AnimatePresence initial={false} mode="wait">
            {isOpen ? (
              <motion.div
                key="minus"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaMinus />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaPlus />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            className="accordion-content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", overflow: "hidden" },
              collapsed: { opacity: 0, height: 0, overflow: "hidden" }
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p>{description}</p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourcesAccordion;
