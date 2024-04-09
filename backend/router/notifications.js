const express = require('express');
const router = express.Router();
const Controller = require('../controller');
const Logger = require('../logger');
const logger = new Logger('logs/accounts.log');
const controller = new Controller();

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: A list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req, res) => {
    const accounts = await controller.getAccounts();
    logger.logInfo('Getting all accounts ${accounts}');
    res.json(accounts);

});


/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get a specific notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A notification object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */

router.get('/:id', async (req, res) => {
    const account = await controller.getAccountById(req.params.id);
    logger.logInfo('Getting account by ID ${account}');
    res.json(account);
});



/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Created notification object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
    const account = await controller.createAccount(req.body);
    res.json(account);
});


/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     summary: Update a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Updated notification object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */

router.put('/:id', async (req, res) => {
    const account = await controller.updateAccount(req.params.id, req.body);
    logger.logInfo('Updating account ${account}');
    res.json(account);
});


/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    const account = await controller.deleteAccount(req.params.id);
    logger.logInfo('Deleting account ${account}');
    res.json(account);
});


module.exports = router;