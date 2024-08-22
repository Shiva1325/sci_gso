const express = require("express");
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;
app.listen(PORT,
    console.log('Server Started')
);

// app.get("/api", (req, res) => {
//     console.log("Got the request")
//     res.json({message: "Hello"});
// });

app.get("/getEventsData", async (req, res) => {
    var EventsData = {
    };
    try {
        var EventsURL = {
            "ACADEMIC_CALENDAR_URL" : "https://25livepub.collegenet.com/calendars/pitt-academic-calendar.json",
            "GRADES_CALENDAR_URL" : "https://25livepub.collegenet.com/calendars/pitt-grades-calendar.json",
            // "ENROLLMENT_CALENDAR_URL" : "https://25livepub.collegenet.com/calendars/pitt-enrollment-calendar.json",
            // "COURSE_CALENDAR_URL" : "https://25livepub.collegenet.com/calendars/pitt-courseclass-calendar.json",
            // "GRADUATION_CALENDAR_URL" : "https://25livepub.collegenet.com/calendars/pitt-graduation-calendar.json",
        }
        const requests = Object.values(EventsURL).map(url => axios.get(url));
        const responses = await Promise.all(requests);
        responses.forEach((response, index) => {
            EventsData[Object.keys(EventsURL)[index]] = response.data;
        });
        res.json(EventsData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});