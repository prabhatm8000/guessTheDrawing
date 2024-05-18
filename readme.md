# guessTheDrawing

[guessTheDrawing](https://guessthedrawing.vercel.app) is an online multiplayer game where players take turns guessing what another player is drawing. It's built with React, Socket.IO and Node.js.

[UI sample](./uiPreview)

## Features

-   Real-time multiplayer gameplay.
-   Simple and intuitive user interface.
-   Players can message/chat with each other in real time.
-   Messaging has swear-word bleeping.
-   Players take turns drawing and guessing.
-   Admin can kick the player.

## Technologies Used

### Frontend:

-   TypeScript
-   React.js
-   Socket.IO Client
-   Tailwind

### Backend:

-   TypeScript
-   Node.js
-   Socket.IO

## Deployment

Client deployed on vercel:
[Click here](https://guessthedrawing.vercel.app/)

Socket server deployed on render.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/guessTheDrawing.git
```

2. Navigate to the project directory:

```bash

cd guessTheDrawing
```

3. Install dependencies for both client and server:

```bash
cd client
npm install
cd ../server
npm install
```

4. Run server:

```bash

cd server
npm run dev
```

5. Run client server:

```bash

cd client
npm run dev
```

6. Open your browser and navigate to http://localhost:5000 to play the game.
