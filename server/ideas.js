//Requirements
const express = require('express');
const ideaRouter = express.Router;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

//export Router
module.exports = ideaRouter;

//Custom middleware
ideaRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        //throw error
        res.status(404).send();
    }
});

//GET /api/ideas to get an array of all ideas.
ideaRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

//POST /api/ideas to create a new idea and save it to the database.
ideaRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

//GET /api/ideas/:ideaId to get a single idea by id.
ideaRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

//PUT /api/ideas/:ideaId to update a single idea by id.
ideaRouter.put('/:id', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

//DELETE /api/ideas/:ideaId to delete a single idea by id.
ideaRouter.delete('/', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});
