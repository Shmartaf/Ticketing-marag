const express = require('express');
const router = express.Router();
const Controller = require('../controller');
const { schemas } = require('../schema/schemas');
const Logger = require('../logger');
const logger = new Logger('logs/teams.log');
const controller = new Controller();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
    *                 $ref: '#/components/schemas/TeamSchema'
 */

router.get('/', async (req, res) => {
    try {
        const teams = await controller.getTeams();
        logger.logInfo(`Getting all teams ${teams}`);
        res.json(teams);
    } catch (err) {
        logger.logError(`Error getting all teams ${err}`);
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a specific team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A team object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamSchema'
 *       404:
 *         description: Team not found
 */
router.get('/:id', async (req, res) => {
    try {
        const team = await controller.getTeamById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        logger.logInfo(`Getting team by ID ${team}`);
        res.json(team);
    } catch (err) {
        logger.logError(`Error getting team by ID ${err}`);
        res.status(500).json({ message: err.message });
    }
});
/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamSchema'
 *     responses:
 *       201:
 *         description: Created team object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamSchema'
 *       400:
 *         description: Bad request
 */

// Create a new Team
router.post('/', async (req, res) => {
    try {
        const newTeam = await controller.createTeam(req.body);
        logger.logInfo(`Creating new team ${newTeam}`);
        res.status(201).json(newTeam);
    } catch (err) {
        logger.logError(`Error creating new team ${err}`);
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
        logger.logInfo(`Getting team by ID ${team}`);
        res.team = team;
        next();
    } catch (err) {
        logger.logError(`Error getting team by ID ${err}`);
        res.status(500).json({ message: err.message });
    }
}


/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamSchema'
 *     responses:
 *       200:
 *         description: Updated team object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/schemas/Teams'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', getTeam, async (req, res) => {
    try {
        const updatedTeam = await controller.updateTeam(req.params.id, req.body);
        logger.logInfo(`Updating team ${updatedTeam}`);
        res.json(updatedTeam);
    } catch (err) {
        logger.logError(`Error updating team ${err}`);
        res.status(400).json({ message: err.message });
    }
});


/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team deleted
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id', getTeam, async (req, res) => {
    try {
        await controller.deleteTeam(req.params.id);
        res.json({ message: 'Team deleted' });
    } catch (err) {
        logger.logError(`Error deleting team ${err}`);
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /teams/{id}/boards:
 *   get:
 *     summary: Get boards for a specific team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to retrieve boards for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Boards retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardSchema'
 *       500:
 *         description: Internal server error
 */
// get boards for a specific team
router.get('/:id/boards', async (req, res) => {
    try {
        const boards = await controller.getBoardsByTeam(req.params.id);
        logger.logInfo(`Getting boards by team ID ${boards}`);
        res.json(boards);
    } catch (err) {
        logger.logError(`Error getting boards by team ID ${err}`);
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /teams/{team_id}/user/{id}:
 *   post:
 *     summary: Add user to a specific team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         description: ID of the team to add the user to
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to add to the team
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User added to team successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post('/:team_id/user/:id', async (req, res) => {
    console.log(req.params);
    try {
        const user = await controller.addUserToTeam(req.params.team_id, req.params.id);
        logger.logInfo(`Adding user to team ${user}`);
        res.json(user);
    } catch (err) {
        logger.logError(`Error adding user to team ${err}`);
        res.status(400).json({ message: err.message });
    }
}
);

/**
 * @swagger
 * /teams/users/{id}:
 *   get:
 *     summary: Get teams for a specific user
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve teams for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teams retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamSchema'
 *       500:
 *         description: Internal server error
 */


router.get('/users/:id', async (req, res) => {
    try {
        const user = await controller.getTeamsByUser(req.params.id);
        logger.logInfo(`Getting teams by user ID ${user}`);
        res.json(user);
    } catch (err) {
        logger.logError(`Error getting teams by user ID ${err}`);
        res.status(500).json({ message: err.message });
    }
}
);









module.exports = router;