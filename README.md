# Bitcoin guessing game

A simple game where players guess whether the bitcoin price will go up or down in the next 60 seconds.

![Screengrab](./screenshot.png)

## How to play

1. Login by clicking on the login button on the top-right and entering a username.
2. Make your guess by clicking on the up/down arrow buttons and confirming your guess.
3. Wait for up to 60 seconds to the result. If your guess is correct, your score is incremented, if it is incorrect, your is score is decremented and if the bitcoin price did not change in the last 60 seconds, your score will remain unchanged.

## How to run locally

### Server

1. Set the DATABASE_URL with a deployed mongodb server URL in **.env**
2. This application uses a [3rd party public API](https://api.api-ninjas.com) for fetching the bitcoin price. Set the API_KEY for the public API in **.env**
3. Set PORT in **.env** to 3000
4. Run `npm install` followed by `npm run dev` to start the server

### UI

1. Make sure that VITE_BASE_URL is set in **.env**
2. Run `npm install` followed by `npm run dev` to start the UI server
