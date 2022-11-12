# Capstone-2

### Link to The Bored API

[The Bored API](http://www.boredapi.com/) is the primary API where data is imported from. App also has a native Node.js backend design API to store user data.


## Initialize app

> Backend requires [PostgreSQL](https://www.postgresql.org/download/)
> Frontend is built on [React](https://reactjs.org/)

- After downloading or cloning this repository follow the steps below in your terminal wherever you have saved the repository:
1. `$ cd backend` change directory to backend
2. `$ npm install` to install all dependencies
3. `$ cd sql` to change to sql directory
4. `$ psql` to open Postgres session
5. `username#= \i boredagain.sql` should run database initialization file for both the app and testing environement - select yes for all options
6. Exit psql using `username#= \q`
7. `$ cd ..` to return to `backend` directory
8. `$ npm start` to create server running on [http://localhost:3001](http://localhost:3001)
9. In a separate terminal tab, navigate to the project directory
10. `$ cd frontend` to enter frontend directory
11. `$ npm install` to install frontend dependencies
12. `$ npm start` to initialize frontend running on [http://localhost:3000](http://localhost:3000) which React should pull up on the browser immediately
