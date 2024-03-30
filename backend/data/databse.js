const mongoose = require('mongoose');
const { board, Teams, account } = require('./models');
require('dotenv').config();


class DBHandler {
    constructor() {
        this.schema = {
            board: board,
            Teams: Teams,
            account: account

        };
        this.url = this.constructConnectionString();
        this.connect();
    }

    constructConnectionString() {
        const username = encodeURIComponent(process.env.MONGO_USERNAME);
        const password = encodeURIComponent(process.env.MONGO_PASSWORD);
        const cluster = process.env.MONGO_CLUSTER;
        const dbname = process.env.MONGO_DBNAME;
        const host = process.env.MONGO_HOST;
        return `mongodb+srv://${username}:${password}@${cluster}.${host}${dbname}?retryWrites=true&w=majority`;
    }

    async connect() {
        // this.logger.log("Connecting to MongoDB database...");
        await mongoose.connect(this.url);
        console.log("Connected to MongoDB database.");
        // this.logger.log("Connected to MongoDB database.");
    }

    async getBoards() {
        const boards = await this.schema.board.find({});
        return boards;
    }

    async getBoardById(id) {
        const board = await this.schema.board.findById(id);
        return board;
    }

    async createBoard(board) {
        const newBoard = this.schema.board.create(board);
        // await newBoard.save();
        return newBoard;
    }

    async updateBoard(id, board) {
        const updatedBoard = await this.schema.board
            .findByIdAndUpdate(id, board, { new: true });
        return updatedBoard;
    }

    async deleteBoard(id) {
        const deletedBoard = await this.schema.board.findByIdAndDelete(id);
        return deletedBoard;
    }

    async getTeams() {
        const teams = await this.schema.Teams.find({});
        return teams;
    }
    async getTeamById(id) {
        const team = await this.schema.Teams.findById(id);
        return team;
    }
    async createTeam(team) {
        const newTeam = this.schema.Teams.create(team);
        return newTeam;
    }

    async updateTeam(id, team) {
        const updatedTeam = await this.schema.Teams
            .findByIdAndUpdate({ "_id": id }, team)
        return updatedTeam;
    }

    async deleteTeam(id) {
        const deletedTeam = await this.schema.Teams.findByIdAndDelete(id);
        return deletedTeam;
    }
    async getBoardsByTeam(team) {
        const boards = await this.schema.board.find({ team: team });
        return boards;
    }

    async getAccountById(id) {
        const account = await this.schema.account.findById(id);
        return account;
    }
    async createAccount(account) {
        const newAccount = this.schema.account.create(account);
        return newAccount;
    }
    async updateAccount(id, account) {
        const updatedAccount = await this.schema.account
            .findByIdAndUpdate(id, account
            )
        return updatedAccount;
    }
    async deleteAccount(id) {
        const deletedAccount = await this.schema.account.findByIdAndDelete(id);
        return deletedAccount;
    }
    async getAllAccounts() {
        const accounts = await this.schema.account.find();
        return accounts;
    }
    async getTeamsByAccount(account) {
        const teams = await this.schema.account.find({ account: account });
        return teams;
    }
}


module.exports = DBHandler;