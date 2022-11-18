# Capstone-2

### See this App in Action!
[not-bored](https://not-bored.surge.sh/) is where this app is live! You can create an account and view the leaderboard, find activities to do, and cure overall boredom

## How [not-bored](https://not-bored.surge.sh/) is deployed:
> Backend hosted on [Heroku](heroku.com)
>> Free development on Heroku is ending November 28, 2022 - check back in the future for their student options

> Frontend is built with [Surge](https://surge.sh/)

- Follow these instructions in the `backend/` directory:
1. `$ heroku login` which will prompt you to login to your Heroku account
2. `$ heroku create app-name-here` where you can name the app however you like as long as it is all lowercase letters and dashes '-'
3. `$ echo "web: node server.js" > Procfile` which tells Heroku which command to run to start the server
4. `$ heroku git:remote -a app-name-here`
5. `$ git add .`
6. `$ git commit -m "ready to deploy backend"`
7. `$ git push heroku main`
8. `$ heroku addons:create heroku-postgresql:hobby-dev -a app-name-here`
9. `$ heroku pg:push bored DATABASE_URL -a app-name-here` this command will clone the bored PostgreSQL database into the production environment. If you have any messy development data in here clear and rebuild the bored database before this step.
10. `$ heroku config:set PGSSLMODE=no-verify`
11. `$ heroku open` this should open a window in your default browser with a json on the screen. Likely you will see a 404 error - THIS IS FINE and means the app is running properly

- If you have issues during this process, try creating a separate git repository for the `backend/` directory and run the commands above again. This is due to Heroku requiring an independent `package.json` file in the root of your directory. You may need to login to Heroku and delete the failed build before a second attempt.

- Next change to the `frontend/` directory:
1. `$ npm install surge` may need to install with the `--g` or `--global` flag depending on permissions
2. `$ REACT_APP_BASE_URL=YOUR_HEROKU_BACKEND_URL npm run build` where the url looks like https://app-name-here.herokuapp.com (DO NOT HAVE ANY FORWARD SLASHES '/' AT THE END OF THE URL)
- This step links our frontend to the backend hosted on Heroku
3. `$ cp build/index.html build/200.html`
4. `$ surge build`
5. Surge will now build your frontend and give you a url to edit. Must end with .surge.sh but you can change the beginning of the url to any not-taken surge url. If it says you do not have permission, someone else has already used your name as a url.
6. Party! The app is deployed into the wild for free.


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
