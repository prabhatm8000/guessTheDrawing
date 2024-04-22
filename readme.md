# guessTheDrawing

guessTheDrawing is an online multiplayer game where players take turns guessing what another player is drawing. It's built with React, Socket.IO and Node.js.

[UI sample](./uiPreview)

## Features

-   Real-time multiplayer gameplay.
-   Simple and intuitive user interface.
-   Players can message/chat wich each other in real-time.
-   Messaging has swear-word bleeping.
-   Players take turns drawing and guessing.
-   Admin can kick player.

## Technologies Used

### Frontend:

-   TypeScript: A statically typed superset of JavaScript that compiles to plain JavaScript.1
-   React: A JavaScript library for building user interfaces.
-   Socket.IO Client: A library that enables real-time, bidirectional and event-based communication between web clients and servers.
-   Tailwind: CSS library

### Backend:

-   TypeScript: Used to write server-side code with type safety and modern JavaScript features.
-   Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.
-   Socket.IO: Enables real-time, bidirectional and event-based communication between web clients and servers.
-   Http server for sockets

## Deployment

Client deployed on vercel:
[Click here](https://guessthedrawing.vercel.app/)

Socket server deployed on render.

## Getting Started

### Prerequisites

-   Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/guessTheDrawing.git
```

2. Navigate to the project directory:

```bash

cd guessTheDrawing
```

3. Install dependencies for both frontend and backend:

```bash
cd frontend
npm install
cd ../backend
npm install
```

4. Running the Application
   Start the backend server:

```bash

cd backend
npm start
```

5. Start the frontend development server:

```bash

cd frontend
npm start
```

6. Open your browser and navigate to http://localhost:5000 to play the game.

Contributing
Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.
