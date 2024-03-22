const express = require('express');
const router = express.Router();
const Controller = require('../controller');

const controller = new Controller();


router.get('/', async (req, res) => {
    const accounts = await controller.getAccounts();
    res.json(accounts);

});

router.get('/:id', async (req, res) => {
    const account = await controller.getAccountById(req.params.id);
    res.json(account);
});

router.post('/', async (req, res) => {
    const account = await controller.createAccount(req.body);
    res.json(account);
});

router.put('/:id', async (req, res) => {
    const account = await controller.updateAccount(req.params.id, req.body);
    res.json(account);
});

router.delete('/:id', async (req, res) => {
    const account = await controller.deleteAccount(req.params.id);
    res.json(account);
});

module.exports = router;