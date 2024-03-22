const express = require('express');
const router = express.Router();
const Controller = require('../controller');

const controller = new Controller();

// Get all boards
router.get('/', async (req, res) => {
    try {
        const boards = await controller.getBoards();
        res.json(boards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific board
router.get('/:id', async (req, res) => {
    try {
        const board = await controller.getBoardById(req.params.id);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        res.json(board);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new board
router.post('/', async (req, res) => {
    try {
        const newBoard = await controller.createBoard(req.body);
        res.status(201).json(newBoard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware function to get board by ID
async function getBoard(req, res, next) {
    try {
        const board = await controller.getBoardById(req.params.id);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        res.board = board;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

router.put('/:id', getBoard, async (req, res) => {
    try {
        const updatedBoard = await controller.updateBoard(req.params.id, req.body);
        res.json(updatedBoard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getBoard, async (req, res) => {
    try {
        await controller.deleteBoard(req.params.id);
        res.json({ message: 'Board deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
