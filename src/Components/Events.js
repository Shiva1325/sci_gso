import React, { useEffect, useState } from 'react';
import Transition from './Transition';

const Events = () => {
    const [EventsData, setEventsData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    var finalEventsData = new Map();
    // const dataObject = {
    //     "EventId": 0,
    //     "EventStartDate": "",
    //     "EventStartTime": "",
    //     "EventEndDate": "",
    //     "EventEndTime": "",
    //     "EventDescription": "",
    //     "EventLocation": "",
    //     "EventTitle": "",
    //     "EventLink": ""
    // };
    var count = 0;
    const reWriteData = (data) => {
        Object.keys(data).map((key) => {
            Object.keys(data[key]).map((val) =>{
                var dataObject = new Map();
                var temp = data[key][val];
                dataObject["EventId"] = temp["eventID"];
                var EventStartDate = new Date(temp["startDateTime"]).toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"});
                var EventEndDate = new Date(temp["endDateTime"]).toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"});
                var EventStartTime = new Date(temp["startDateTime"]).toLocaleTimeString('en-US', {hour:"2-digit", minute:"2-digit"});
                var EventEndTime = new Date(temp["startDateTime"]).toLocaleTimeString('en-US', {hour:"2-digit", minute:"2-digit"});
                dataObject["EventStartDate"] = EventStartDate;
                dataObject["EventStartTime"] = EventStartTime;
                dataObject["EventEndDate"] = EventEndDate;
                dataObject["EventEndTime"] = EventEndTime;
                dataObject["EventDescription"] = temp["customFields"][0]["value"];
                dataObject["EventLocation"] = temp["location"];
                dataObject["EventTitle"] = temp["title"];
                dataObject["EventLink"] = temp["permaLinkUrl"];
                if (finalEventsData.has(EventStartDate)) {
                    const timeMap = finalEventsData.get(EventStartDate);
                    if (timeMap.has(EventStartTime)) {
                        timeMap.get(EventStartTime).push(dataObject);
                    } else {
                        timeMap.set(EventStartTime, [dataObject]);
                    }
                } else {
                    const timeMap = new Map();
                    timeMap.set(EventStartTime, [dataObject]);
                    finalEventsData.set(EventStartDate, timeMap);
                }
                
            })
        })
        finalEventsData = sortEventsData(finalEventsData);
        console.log(finalEventsData);
    };
    function sortEventsData(eventData) {
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
    }  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/getEventsData");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEventsData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            } finally{
                reWriteData(EventsData);
                setLoading(false);
            }
        };
        fetchData();
      }, []);
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;
        if (!EventsData) return <div>No data available</div>;
        return (
            <div>
                <h1>This is the Events page</h1>
                <div>
                {Object.keys(finalEventsData).map(key => (
                    <div key={key}>
                        <h2>{key}</h2>
                        <pre>{JSON.stringify(finalEventsData[key])}</pre>
                    </div>
                ))}
            </div>
    
            </div>
        )
}

export default Transition(Events);