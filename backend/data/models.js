const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: false },
  },
  { strict: false }
);

const boardSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: false },
  account_id: { type: String, required: false },
  color: { type: String, required: false },
  username: { type: String, required: false },
  board_name: { type: String, required: true },
  users: [{ type: String, required: false }],
  team: { type: String, required: true },
  incidents: [incidentSchema],
  columns: { type: Object },
});

const TeamsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  team_name: { type: String, required: true },
  users: [{ type: String, required: true }],
  boards: [{ type: String, required: true }],
});

const accountsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  account_name: { type: String, required: true },
  teams: [{ type: String, required: true }],
});

const notificationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  message: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const messagingSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  conversation_id: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = {
  board: mongoose.model("Board", boardSchema),
  Teams: mongoose.model("Teams", TeamsSchema),
  account: mongoose.model("Accounts", accountsSchema),
  notification: mongoose.model("Notifications", notificationSchema),
  messaging: mongoose.model("Messaging", messagingSchema),
};


