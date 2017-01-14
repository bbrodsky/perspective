# perception

## Running Locally

### Prerequisites
- [Node.js and npm](https://nodejs.org/en/)
- [Twilio account](https://www.twilio.com/)

### Installing dependencies

```sh
npm install
```

This will install all runtime dependencies, as well as Webpack build tools.

You will also need to create a `.env` file to store your Twilio credentials for development. It should look something like this:

```sh
TWILIO_ACCOUNT_SID = XXX
TWILIO_API_KEY = XXX
TWILIO_API_SECRET = XXX
TWILIO_CONFIGURATION_SID = XXX
```

### Running the app

```sh
npm run build-dev
npm start
```

The first command will run Webpack, building the front end static files in development mode. The second command will run the node server. This setup simulates a production environment without the performance enhacements.

## Running in Prod

Running the application in Prod is similar to running it locally:

```sh
npm install
npm run build
npm start
```

The build should be run at some point before the app is uploaded to the production server, otherwise the build files must be uploaded as well.
