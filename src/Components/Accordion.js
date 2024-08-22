import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Accordion = ({ i, date, timeMap }) => {
  const [expanded, setExpanded] = useState(
    new Date().toDateString() === new Date(date).toDateString()
  );
  const isOpen = expanded;

  const toggleAccordion = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div key={i} className="eventsCard">
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FFB81C" : "#003594" }}
        onClick={toggleAccordion}
        style={{ cursor: "pointer", padding: "10px", color: isOpen ? "black":"white" }}
      >
        <h2>{date}</h2>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="card-section"
          >
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.8 }}
              className="content-placeholder"
              style={{ padding: "10px" }}
            >
              {Array.from(timeMap.entries()).map(([time, events]) => (
                <div key={time} className="event-card-container">
                  <h3 className="event-time">{time}</h3>
                  <ul>
                    {events.map((event, index) => (
                      <li key={index} className="time-wise-events">
                        <span className="event-card-title"><strong>Title:</strong> {event.EventTitle}</span> <br />
                        <span><strong>Location:</strong> {event.EventLocation} <br /></span>
                        <span className=".event-card-description"><strong>Description:</strong> {event.EventDescription}{" "}<br /></span>
                        <span><strong>Link:</strong>{" "}<a href={event.EventLink} target="_blank" rel="noopener noreferrer">
                          Learn More
                        </a></span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Accordion;
