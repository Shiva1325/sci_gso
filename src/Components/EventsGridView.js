import Accordion from './Accordion';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const EventsGridView = ({ finalEventsData }) => {
    var first_record_date = finalEventsData.entries().next().value[0];
    var today_date_exists = true;

    if (new Date(first_record_date).getTime() > new Date().getTime()) {
        today_date_exists = false;
    }

    const [expanded, setExpanded] = useState(today_date_exists);
    const [page, setPage] = useState(1);
    const eventsPerPage = 5;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    var today_date = new Date().toLocaleDateString('en-US', { day: "numeric", month: "short", year: "numeric" });
    const isOpen = !expanded;

    const toggleAccordion = () => {
        setExpanded((prev) => !prev);
    };
    const totalEvents = Array.from(finalEventsData.entries()).length;
    const startIndex = (page - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const paginatedEvents = Array.from(finalEventsData.entries()).slice(startIndex, endIndex);

    return (
        <div>
            <div className='eventsContainer'>
                {page === 1 && !today_date_exists && (
                    <div className="eventsCard">
                        <motion.header
                            initial={false}
                            animate={{ backgroundColor: isOpen ? "#FFB81C" : "#003594" }}
                            onClick={toggleAccordion}
                            style={{ cursor: "pointer", padding: "10px", color: isOpen ? "black" : "white" }}
                        >
                            <h2>{today_date}</h2>
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
                                        <strong>No Events Today!!!</strong>
                                    </motion.div>
                                </motion.section>
                            )}
                        </AnimatePresence>
                    </div>
                )}
                {paginatedEvents.map(([date, timeMap]) => (
                    new Date(today_date).getTime() <= new Date(date).getTime() && (
                        <Accordion key={date} i={date} date={date} timeMap={timeMap} />
                    )
                ))}
            </div>
            <div>
                <Box className='paginationBoxes' display="flex" justifyContent="center" marginTop={3}>
                    <Pagination
                        count={Math.ceil(totalEvents / eventsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            </div>
            
        </div>
    );
};

export default EventsGridView;
