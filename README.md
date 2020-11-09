# Developer Connector 2.0

###### Social network for developers

This is a MERN stack application for developers to share their profiles and ideas.

## Quick Start

###### Add a default.json file in config folder
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}

###### Install server dependencies
npm install

###### Install client dependencies
cd client
npm install

###### Run both Express & React from root
npm run dev
