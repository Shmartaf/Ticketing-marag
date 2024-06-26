const express = require('express');
const router = express.Router();
const Controller = require('../controller');
const Logger = require('../logger');
const controller = new Controller();
const logger = new Logger('logs/messages.log');

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req, res) => {
    const accounts = await controller.getMessages();
    logger.logInfo('Getting all messages ${accounts}');
    res.json(accounts);

});

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get messages by conversation ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the conversation to retrieve messages
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of messages belonging to the conversation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */

router.get('/:id', async (req, res) => {
    const account = await controller.getMessagesByConversation(req.params.id);
    logger.logInfo('Getting messages by conversation ID ${account}');
    res.json(account);
});


/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Created message object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
    const message = await controller.createMessage(req.body);
    res.json(account);
    logger.logInfo(`New message created: ${message.name}`);
    const newNotification = {
        message: `New message created: ${message.name}`,
        message_id: message._id,
        date: new Date(),
    };
    const notif = await controller.createNotification(newNotification);
    logger.logInfo(`New notification created: ${notif.message}`);


});



/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the message to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    const message = await controller.deleteMessage(req.params.id);
    logger.logInfo(`Message deleted: ${message}`);
    res.json(message);
});



module.exports = router;
