const express = require("express");
const cors = require("cors");
const swaggerDocs = require("./utils/swagger"); // Import swaggerDocs function
// Routes
const boardRouter = require("./router/boards");
const teamRouter = require("./router/Teams");
const accountRouter = require("./router/Accounts");
const notificationRouter = require("./router/notifications");
const messagingRouter = require("./router/messaging");

const app = express();
const PORT = process.env.PORT || 8080;
const Logger = require("./logger");
const logger = new Logger("logs/server.log");

// Middleware
app.use(express.json());
app.use(cors());

// Swagger documentation
swaggerDocs(app, PORT); // Pass app and PORT to swaggerDocs function

// Your API routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/boards", boardRouter);
app.use("/teams", teamRouter);
app.use("/accounts", accountRouter);
app.use("/notifications", notificationRouter);
app.use("/messaging", messagingRouter);

// Start the server
app.listen(5006, () => {
  logger.logInfo(`Server is running on port ${PORT}`);
});
