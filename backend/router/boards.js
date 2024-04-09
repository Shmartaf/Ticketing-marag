const express = require("express");
const router = express.Router();
const Controller = require("../controller");

const controller = new Controller();

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: A list of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       500:
 *         description: Internal server error
 */

// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await controller.getBoards();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get a specific board by ID
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the board to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A board object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       404:
 *         description: Board not found
 *       500:
 *         description: Internal server error
 */

// Get a specific board
router.get("/:id", async (req, res) => {
  try {
    const board = await controller.getBoardById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       201:
 *         description: Created board object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


// Create a new board
router.post("/", async (req, res) => {
  try {
    const newBoard = await controller.createBoard(req.body);
    res.status(201).json(newBoard);
    const newNotification = {
      message: `New board created: ${newBoard.name}`,
      board_id: newBoard._id,
      date: new Date(),
    };
    const notif = await controller.createNotification(newNotification);


  } catch (err) {
    res.status(400)
  }
});

// Middleware function to get board by ID
async function getBoard(req, res, next) {
  try {
    const board = await controller.getBoardById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.board = board;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * @swagger
 * /boards/{id}:
 *   put:
 *     summary: Update a board by ID
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the board to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       200:
 *         description: Updated board object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Board not found
 *       500:
 *         description: Internal server error
 */


router.put("/:id", getBoard, async (req, res) => {
  try {
    const updatedBoard = await controller.updateBoard(req.params.id, req.body);
    res.json(updatedBoard);
    console.log(updatedBoard);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});


/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Delete a board by ID
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the board to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board deleted
 *       404:
 *         description: Board not found
 *       500:
 *         description: Internal server error
 */



router.delete("/:id", getBoard, async (req, res) => {
  try {
    await controller.deleteBoard(req.params.id);
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /boards/user/{id}:
 *   get:
 *     summary: Get all boards for a specific user
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve boards for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       500:
 *         description: Internal server error
 */


router.get("/user/:id", async (req, res) => {
  try {
    const boards = await controller.getBoardsByUser(req.params.id);
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
