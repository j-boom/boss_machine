//Requirements
const express = require('express');
const meetingRouter = express.Router;

const {
    getAllFromDatabase,
    addToDatabase,
    updateInstanceInDatabase,
    deleteAllFromDatabase,
} = require('./db');

//export Router
module.exports = meetingRouter;


//GET /api/meetings to get an array of all meetings.
meetingRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

//POST /api/meetings to create a new meeting and save it to the database.
meetingRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', req.body);
    res.status(201).send(newMeeting);
});

//DELETE /api/meetings to delete all meetings from the database.
meetingRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});


