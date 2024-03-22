const express = require('express');
const router = express.Router();
const Controller = require('../controller');

const controller = new Controller();

// Get all Teams
router.get('/', async (req, res) => {
    try {
        const teams = await controller.getTeams();
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific Team
router.get('/:id', async (req, res) => {
    try {
        const team = await controller.getTeamById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json(team);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new Team
router.post('/', async (req, res) => {
    try {
        const newTeam = await controller.createTeam(req.body);
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware function to get Team by ID
async function getTeam(req, res, next) {
    try {
        const team = await controller.getTeamById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.team = team;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

router.put('/:id', getTeam, async (req, res) => {
    try {
        const updatedTeam = await controller.updateTeam(req.params.id, req.body);
        res.json(updatedTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getTeam, async (req, res) => {
    try {
        await controller.deleteTeam(req.params.id);
        res.json({ message: 'Team deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get boards for a specific team
router.get('/:id/boards', async (req, res) => {
    try {
        const boards = await controller.getBoardsByTeam(req.params.id);
        res.json(boards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;