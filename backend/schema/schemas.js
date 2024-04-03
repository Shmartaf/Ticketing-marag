const incidentSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'uuid' }
    }
};

const boardSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'uuid' },
        account_id: { type: 'string' },
        color: { type: 'string' },
        username: { type: 'string' },
        board_name: { type: 'string' },
        users: { type: 'array', items: { type: 'string' } },
        team: { type: 'string' },
        incidents: { type: 'array', items: { $ref: '#/components/schemas/Incident' } },
        columns: { type: 'object' }
    },
    required: ['account_id', 'username', 'board_name', 'users', 'team']
};

const teamsSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'uuid' },
        team_name: { type: 'string' },
        users: { type: 'array', items: { type: 'string' } },
        boards: { type: 'array', items: { type: 'string' } }
    },
    required: ['team_name', 'users', 'boards']
};

const accountsSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'uuid' },
        account_name: { type: 'string' },
        teams: { type: 'array', items: { type: 'string' } }
    },
    required: ['account_name', 'teams']
};

const notificationSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'uuid' },
        message: { type: 'string' },
        sender: { type: 'string' },
        receiver: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' }
    },
    required: ['message', 'sender', 'receiver']
};

const messagingSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string', format: 'uuid' },
        conversation_id: { type: 'string' },
        sender: { type: 'string' },
        receiver: { type: 'string' },
        message: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' }
    },
    required: ['conversation_id', 'sender', 'receiver', 'message']
};

module.exports = {
    schemas: {
        Incident: incidentSchema,
        Board: boardSchema,
        Teams: teamsSchema,
        Accounts: accountsSchema,
        Notifications: notificationSchema,
        Messaging: messagingSchema
    }
};
