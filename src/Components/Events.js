import React, { useEffect, useState } from 'react';
import Transition from './Transition';
import "../Styles/events.css";
import EventsGridView from './EventsGridView';
import EventsCalendarView from './EventsCalendarView';
import { motion } from 'framer-motion';
import ViewListIcon from '@material-ui/icons/ViewList';
import CalendarMonthIcon from '@material-ui/icons/CalendarTodayOutlined';
import Loading from './Loading';
const Events = () => {
    const [finalEventsData, setFinalEventsData] = useState(new Map());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const defaultIndex = 0;

    const reWriteData = (data) => {
        let tempFinalEventsData = new Map();

        Object.keys(data).forEach((key) => {
            Object.keys(data[key]).forEach((val) => {
                let temp = data[key][val];
                // var todayDate = new Date().toLocaleDateString('en-US', { day: "numeric", month: "short", year: "numeric" });
                // if(new Date(todayDate).getTime() <= new Date(temp["startDateTime"]).getTime()){
                    let dataObject = {};
                    let EventStartDate = new Date(temp["startDateTime"]).toLocaleDateString('en-US', { day: "numeric", month: "short", year: "numeric" });
                    let EventEndDate = new Date(temp["endDateTime"]).toLocaleDateString('en-US', { day: "numeric", month: "short", year: "numeric" });
                    let EventStartTime = new Date(temp["startDateTime"]).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
                    let EventEndTime = new Date(temp["endDateTime"]).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
                    console.log(EventStartDate);
                    dataObject["EventId"] = temp["eventID"];
                    dataObject["EventStartDate"] = EventStartDate;
                    dataObject["EventStartTime"] = EventStartTime;
                    dataObject["EventEndDate"] = EventEndDate;
                    dataObject["EventEndTime"] = EventEndTime;
                    dataObject["EventDescription"] = temp["customFields"][0]["value"];
                    dataObject["EventLocation"] = temp["location"];
                    dataObject["EventTitle"] = temp["title"];
                    dataObject["EventLink"] = temp["permaLinkUrl"];

                    if (tempFinalEventsData.has(EventStartDate)) {
                        const timeMap = tempFinalEventsData.get(EventStartDate);
                        if (timeMap.has(EventStartTime)) {
                            timeMap.get(EventStartTime).push(dataObject);
                        } else {
                            timeMap.set(EventStartTime, [dataObject]);
                        }
                    } else {
                        const timeMap = new Map();
                        timeMap.set(EventStartTime, [dataObject]);
                        tempFinalEventsData.set(EventStartDate, timeMap);
                    }
                // }
                
            });
        });

        const sortedFinalEventsData = sortEventsData(tempFinalEventsData);
        setFinalEventsData(sortedFinalEventsData);
    };

    const sortEventsData = (eventData) => {
        const sortedDateEntries = [...eventData.entries()].sort(([dateA], [dateB]) => {
            return new Date(dateA) - new Date(dateB);
        });

        const sortedEventsData = new Map();
        for (let [date, timeMap] of sortedDateEntries) {
            const sortedTimeEntries = [...timeMap.entries()].sort(([timeA], [timeB]) => {
                const dateA = new Date(`1970-01-01T${timeA}:00`);
                const dateB = new Date(`1970-01-01T${timeB}:00`);
                return dateA - dateB;
            });
            sortedEventsData.set(date, new Map(sortedTimeEntries));
        }
        return sortedEventsData;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/getEventsData");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("kjdnkjbnsdv", data);
                reWriteData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const tabs = [
        { title: "List View", id: "listView", color: "#5d5dff", icon: <ViewListIcon /> },
        { title: "Calendar View", id: "calendarView", color: "#67bb67", icon: <CalendarMonthIcon /> }
    ];

    const tabVariant = {
        active: { width: "100%", transition: { type: "tween", duration: 0.4 } },
        inactive: { width: "100%", transition: { type: "tween", duration: 0.4 } }
    };

    const tabContentVariant = {
        active: { display: "block", transition: { staggerChildren: 0.2 } },
        inactive: { display: "none" }
    };

    const cardVariant = {
        active: { opacity: 1, y: 10, transition: { duration: 0.5 } },
        inactive: { opacity: 0, y: 10, transition: { duration: 0.5 } }
    };

    useEffect(() => {
        document.documentElement.style.setProperty("--active-color", tabs[activeTabIndex].color);
    }, [activeTabIndex]);

    useEffect(() => {
        const tabFromHash = tabs.findIndex(tab => `#${tab.id}` === window.location.hash);
        setActiveTabIndex(tabFromHash !== -1 ? tabFromHash : defaultIndex);
    }, [tabs]);

    const onTabClick = (index) => {
        setActiveTabIndex(index);
        window.location.hash = `#${tabs[index].id}`;
    };
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;
    // if (!finalEventsData || finalEventsData.size === 0) return <div>No data available</div>;

    return (
        <div className="container">
            <div className="tabs-component">
                <ul className="tab-links" role="tablist">
                    {tabs.map((tab, index) => (
                        <motion.li
                            key={tab.id}
                            className={`tab ${activeTabIndex === index ? 'active' : ''}`}
                            role="presentation"
                            variants={tabVariant}
                            animate={activeTabIndex === index ? "active" : "inactive"}
                        >
                            <a href={`#${tab.id}`} onClick={() => onTabClick(index)}>
                                {tab.icon}
                                <motion.span className='tabTile'>{tab.title}</motion.span>
                            </a>
                        </motion.li>
                    ))}
                </ul>
                
                {loading ? (
                    // <div className="loading">Loading...</div>
                    <Loading />
                ) : error ? (
                    <div className="error">Error loading events. Please try again later.</div>
                ) : (!finalEventsData || finalEventsData.length === 0) ? (
                    <div className="no-events">No events available</div>
                ) : (
                    <>
                        <motion.div
                            role="tabpanel"
                            id="listView"
                            className="tab-content"
                            variants={tabContentVariant}
                            animate={activeTabIndex === 0 ? "active" : "inactive"}
                            initial="inactive"
                        >
                            <motion.div variants={cardVariant}>
                                <EventsGridView finalEventsData={finalEventsData} />
                            </motion.div>
                        </motion.div>
                        <motion.div
                            role="tabpanel"
                            id="calendarView"
                            className="tab-content"
                            variants={tabContentVariant}
                            animate={activeTabIndex === 1 ? "active" : "inactive"}
                            initial="inactive"
                        >
                            <motion.div variants={cardVariant}>
                                <EventsCalendarView finalEventsData={finalEventsData} isVisible={activeTabIndex === 1 ? true:false} />
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </div>
        </div>


    );
};

export default Transition(Events);
