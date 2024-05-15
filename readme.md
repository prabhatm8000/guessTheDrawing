# guessTheDrawing

guessTheDrawing is an online multiplayer game where players take turns guessing what another player is drawing. It's built with React, Socket.IO and Node.js.

[UI sample](./uiPreview)

## Features

-   Real-time multiplayer gameplay.
-   Simple and intuitive user interface.
-   Players can message/chat with each other in real time.
-   Messaging has swear-word bleeping.
-   Players take turns drawing and guessing.
-   Admin can kick the player.

## Technologies Used

### Frontend:

-   TypeScript
-   React.js
-   Socket.IO Client
-   Tailwind

### Backend:

-   TypeScript
-   Node.js
-   Socket.IO

## Deployment

Client deployed on vercel:
[Click here](https://guessthedrawing.vercel.app/)

Socket server deployed on render.

## Getting Started

### Prerequisites

-   Node.js and npm installed on your machine.

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
npm run start
```

5. Start the frontend development server:

```bash

cd frontend
npm run dev
```

6. Open your browser and navigate to http://localhost:5000 to play the game.

Contributing
Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.