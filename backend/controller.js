const DBHandler = require('./data/databse');

class Controller {
    constructor() {
        this.db = new DBHandler();
    }

    async getBoards() {
        return await this.db.getBoards();
    }

    async getBoardById(id) {
        return await this.db.getBoardById(id);
    }

    async createBoard(board) {
        return await this.db.createBoard(board);
    }

    async updateBoard(id, board) {
        return await this.db.updateBoard(id, board);
    }

    async deleteBoard(id) {
        return await this.db.deleteBoard(id);
    }

    async getBoardsByTeam(team) {
        return await this.db.getBoardsByTeam(team);
    }

    async getTeams() {
        return await this.db.getTeams();
    }

    async getTeamById(id) {
        return await this.db.getTeamById(id);
    }

    async createTeam(team) {
        return await this.db.createTeam(team);
    }

    async updateTeam(id, team) {
        return await this.db.updateTeam(id, team);
    }

    async deleteTeam(id) {
        return await this.db.deleteTeam(id);
    }

    async getAccountById(id) {
        return await this.db.getAccountById(id);
    }

    async getAccounts() {
        return await this.db.getAllAccounts();
    }

    async createAccount(account) {
        return await this.db.createAccount(account);
    }

    async updateAccount(id, account) {
        return await this.db.updateAccount(id, account);
    }

    async deleteAccount(id) {
        return await this.db.deleteAccount(id);
    }

}

module.exports = Controller;