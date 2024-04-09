const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logFilePath) {
        if (!fs.existsSync(path.dirname(logFilePath))) {
            fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
        }
        this.logFilePath = logFilePath;
    }

    logInfo(message) {
        this.log(`[INFO] ${message}`);
    }

    logError(message) {
        this.log(`[ERROR] ${message}`);
    }

    log(message) {
        const logMessage = `${new Date().toISOString()} - ${message}\n`;
        console.log(logMessage);
        fs.appendFile(this.logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }

    clear() {
        fs.writeFile(this.logFilePath, '', (err) => {
            if (err) {
                console.error('Error clearing log file:', err);
            } else {
                console.log('Log file cleared.');
            }
        });
    }
}

module.exports = Logger;
