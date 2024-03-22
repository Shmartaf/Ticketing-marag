const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
}, { strict: false });


const boardSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true },
    board_name: { type: String, required: true },
    users: [{ type: String, required: true }],
    team: { type: String, required: true },
    incidents: [
        incidentSchema
    ],
    mapping: { type: Object }
});

const TeamsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    team_name: { type: String, required: true },
    users: [{ type: String, required: true }],
    boards: [{ type: String, required: true }]
});



module.exports = {
    board: mongoose.model('Board', boardSchema),
    Teams: mongoose.model('Teams', TeamsSchema)
};


