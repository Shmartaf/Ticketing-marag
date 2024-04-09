
# Project Title

Dynamic board and ticket management web application inspired by Monday.com. Built with Node.js, Express, MongoDB, React, and Vite, and integrated with Supabase for authentication.

## Description

This project aims to provide a user-friendly platform for managing tasks, tickets, and boards. Whether you're tracking software bugs, managing project tasks, or planning events, our application offers a dynamic and intuitive interface to keep everything organized.

## Features

- **Dynamic Boards**: Create, update, and delete boards to manage various aspects of your projects.
- **Task Management**: Add, edit, and remove tasks within boards with a simple and interactive UI.
- **Team Collaboration**: Share boards with your team and manage tasks collaboratively.
- **Real-time Updates**: Changes are updated in real-time for all users viewing a board.
- **Messages in Tickets**: Each ticket includes a chat icon; clicking it opens a dialog showing logs of messages left by team members, including the user's name, time, and message.
- **Secure Authentication**: Integrated with Supabase for secure and hassle-free user authentication.

## Tech Stack

- **Backend**: Node.js with Express for the API server.
- **Database**: MongoDB for data storage.
- **Frontend**: React with Vite for a fast and efficient development experience.
- **Authentication**: Supabase Auth for user authentication and management.
- **Documentation**: Swagger UI for API documentation.

## Getting Started

### For Developers

If you're interested in running the project locally or contributing, follow these steps:

#### Prerequisites

- Node.js
- React

#### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Shmartaf/Ticketing-marag.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install NPM packages for backend
   ```sh
   cd backend
   npm install
   ```
4. Install NPM packages for frontend
   ```sh
   cd..
   cd ticket
   npm install
   ```
5. If you do not have access to the `.env` file, create one in the backend directory with your MongoDB and Supabase credentials.

6. Start the backend service from backend directory:
   ```sh
   npm start
   ```
7. Start the frontend service from ticket directory:
   ```sh
   npm run dev
   ```

### For Visitors

If you're just looking to explore, visit our live demo:

- Frontend UI: [Boards](https://main.dk5hmwym9ett3.amplifyapp.com/)
- Swagger UI documentation: [Docs](https://ticketing-marag.onrender.com/docs)

## Usage

The backend is deployed on Render, and the frontend is available on AWS Netlify. Navigate to the Frontend UI link provided above to start exploring the application. The Swagger UI documentation can be accessed for detailed API endpoints information and testing.

### users example:
- gal@gal.com - admin team 1
- shai@shai.com - team member

- admin-b@gmail.com - admin team 2
- shlomi@shlomi.com - team member

#### password all user : 123456
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Contact

Project Link: [https://github.com/Shmartaf/Ticketing-marag](https://github.com/Shmartaf/Ticketing-marag)
