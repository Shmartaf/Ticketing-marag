const express = require('express');
const router = express.Router();
const Controller = require('../controller');

const controller = new Controller();

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: A list of accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req, res) => {
    const accounts = await controller.getAccounts();
    res.json(accounts);

});


/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get a specific account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the account to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An account object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */

router.get('/:id', async (req, res) => {
    const account = await controller.getAccountById(req.params.id);
    res.json(account);
});


/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: Created account object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
    const account = await controller.createAccount(req.body);
    res.json(account);
});

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: Update an account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the account to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: Updated account object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */

router.put('/:id', async (req, res) => {
    const account = await controller.updateAccount(req.params.id, req.body);
    res.json(account);
});


/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the account to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account deleted
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id', async (req, res) => {
    const account = await controller.deleteAccount(req.params.id);
    res.json(account);
});

/**
 * @swagger
 * /accounts/users/{id}:
 *   get:
 *     summary: Get account by user ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve account
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An account object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */


router.get('/users/:id', async (req, res) => {
    const account = await controller.getAccountByUserId(req.params.id);
    res.json(account);
});
module.exports = router;