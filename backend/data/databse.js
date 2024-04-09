const mongoose = require('mongoose');
const { board, Teams, account, notification, messaging } = require('./models');
require('dotenv').config();


class DBHandler {
    constructor() {
        this.schema = {
            board: board,
            Teams: Teams,
            account: account,
            notification: notification,
            messaging: messaging


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

    async getNotifications() {
        const notifications = await this.schema.notification.find();
        return notifications;
    }

    async getNotificationById(id) {
        const notification = await this.schema.notification.findById(id);
        return notification;
    }

    async createNotification(notification) {
        const newNotification = this.schema.notification.create(notification);
        return newNotification;
    }

    async updateNotification(id, notification) {
        const updatedNotification = await this.schema.notification
            .findById
    }

    async deleteNotification(id) {
        const deletedNotification = await this.schema.notification.findByIdAndDelete(id);
        return deletedNotification;
    }

    async getMessages() {
        const messages = await this.schema.messaging.find();
        return messages;
    }

    async getMessageById(id) {
        const message = await this.schema.messaging.findById(id);
        return message;
    }

    async createMessage(message) {
        const newMessage = this.schema.messaging.create(message);
        return newMessage;
    }

    async updateMessage(id, message) {
        const updatedMessage = await this.schema.messaging
    }

    async deleteMessage(id) {
        const deletedMessage = await this.schema.messaging.findByIdAndDelete(id);
        return deletedMessage;
    }

    async getMessagesByConversation(id) {
        const messages = await this.schema.messaging.find({ conversation_id: id });
        return messages;
    }

    async getNotificationsByReceiver(id) {
        const notifications = await this.schema.notification.find({ receiver: id });
        return notifications;
    }

    async getMessagesByReceiver(id) {
        const messages = await this.schema.messaging.find({ receiver: id });
        return messages;
    }

    async addUserToTeam(id, user) {
        const team = await this.schema.Teams.findById(id);
        team.users.push(user);
        await team.save();
        return team;
    }

    async getBoardsByUser(userId) {
        try {
            const userTeams = await this.schema.Teams.find({ users: userId });
            const boards_ids = [].concat(...userTeams.map(team => team.boards));
            const boards = await this.schema.board.find({ _id: { $in: boards_ids } });
            return boards;
        } catch (error) {
            console.error("Error fetching boards by user:", error);
            throw error;
        }
    }

    async getTeamsByUser(userId) {
        try {
            const teams = await this.schema.Teams.find({ users: userId });
            return teams;
        } catch (error) {
            console.error("Error fetching teams by user:", error);
            throw error;
        }
    }

    async getAccountByUserId(userId) {
        try {
            const teams = await this.getTeamsByUser(userId);
            const team_ids = teams.map(team => team._id);
            const account = await this.schema.account.find({ teams: { $in: team_ids } });
            return account;
        } catch (error) {
            console.error("Error fetching account by user:", error);
            throw error;
        }
    }
}


module.exports = DBHandler;