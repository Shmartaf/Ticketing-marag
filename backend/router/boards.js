const express = require("express");
const router = express.Router();
const Controller = require("../controller");
const Logger = require("../logger");
const controller = new Controller();
const logger = new Logger("logs/boards.log");
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
 *                 $ref: '#/components/schemas/BoardSchema'
 *       500:
 *         description: Internal server error
 */

// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await controller.getBoards();
    logger.logInfo(`Getting all boards ${boards}`);
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.logError(`Error getting all boards ${err}`);
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
 *               $ref: '#/components/schemas/BoardSchema'
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
    logger.logInfo(`Getting board by ID ${board}`);
    res.json(board);
  } catch (err) {
    logger.logError(`Error getting board by ID ${err}`);
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
 *             $ref: '#/components/schemas/BoardSchema'
 *     responses:
 *       201:
 *         description: Created board object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardSchema'
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
    logger.logInfo(`New board created: ${newBoard.board_name}`);
    // const newNotification = {
    //   message: `New board created: ${newBoard.name}`,
    //   board_id: newBoard._id,
    //   date: new Date(),
    // };
    // const notif = await controller.createNotification(newNotification);


  } catch (err) {
    // res.status(400).json({ message: err.message });
    logger.logError(`Error creating new board ${err}`);
    res.status(400)
  }
});

// Middleware function to get board by ID
async function getBoard(req, res, next) {
  try {
    const board = await controller.getBoardById(req.params.id);
    logger.logInfo(`Getting board by ID ${board}`);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.board = board;
    next();
  } catch (err) {
    logger.logError(`Error getting board by ID ${err}`);
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
 *             $ref: '#/components/schemas/BoardSchema'
 *     responses:
 *       200:
 *         description: Updated board object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardSchema'
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
    logger.logInfo(`Board updated: ${updatedBoard.name}`);
    // console.log(updatedBoard);
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
    logger.logError(`Error deleting board by ID ${err}`);
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
 *                 $ref: '#/components/schemas/BoardSchema'
 *       500:
 *         description: Internal server error
 */


router.get("/user/:id", async (req, res) => {
  try {
    const boards = await controller.getBoardsByUser(req.params.id);
    logger.logInfo(`Getting all boards for user ${req.params.id}`);
    res.json(boards);
  } catch (err) {
    logger.logError(`Error getting all boards for user ${req.params.id} ${err}`);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
