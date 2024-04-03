const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../package.json');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version,
            description: 'API documentation for Ticketing project',
        },
        components: {
            schemas: {
                TeamSchema: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'uuid' },
                        team_name: { type: 'string' },
                        users: { type: 'array', items: { type: 'string' } },
                        boards: { type: 'array', items: { type: 'string' } }
                    },
                    required: ['team_name', 'users', 'boards']
                },
                AccountSchema: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'uuid' },
                        account_name: { type: 'string' },
                        teams: { type: 'array', items: { type: 'string' } }
                    },
                    required: ['account_name', 'teams']
                },
                NotificationSchema: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'uuid' },
                        message: { type: 'string' },
                        sender: { type: 'string' },
                        receiver: { type: 'string' },
                        timestamp: { type: 'string', format: 'date-time' }
                    },
                    required: ['message', 'sender', 'receiver']
                },
                MessagingSchema: {
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
                },
                BoardSchema: {
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
                },
                Incident: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'uuid' }
                    },
                    required: []
                }
            }
        }
    },
    apis: ['backend/router/*.js', 'backend/models/*.js', 'router/*.js', 'models/*.js', 'schema/*.js', 'backend/schema/*.js', 'backend/schema/schemas.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;
