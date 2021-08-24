<!-- @format -->

This is the React code base for the App "Senf" (https://senf.koeln/) <br/>
Since we don't want to touch live data, we have set up this as a test environment.

## About

The aim of this project is to strengthen participation of citizens in urban planning & to make it more interactive and transparent. Since we see citizens as the real experts in their neighborhoods, we want to create an attractive opportunity for people to contribute their own ideas and suggestions.

Ultimately, through this platform, we are attempting to establish a collaborative community-based environment in which citizens have a voice and organizations of any kind are empowered to be more participatory. Simultaneously, we see this environment as a space for people to get creative and connect in real life in order to collectively shape their own urban space.

Since the beginning of 2021, we have been running this platform for the area of Cologne, Germany – and we see this expanding to any city and municipality. Btw: checkout/follow our [Instagram](https://www.instagram.com/senf.koeln/)

This project was started by an amateur programmer, so please don't be too harsh about the current quality - let's level it up!

## 1: Fork this repository and clone your own Fork

To avoid ending up with an unmanageable amount of branches, we decided to go this way: fork the repository first and then clone it. When contributing, create a pull request as described in [this documentation](/docs/CREATE_A_PULL_REQUEST.md)

## 2: Create a Mapbox Account and get an Access Token

To obtain an access token, sign in to https://www.mapbox.com/ and visit Account > Tokens. The token will start with "pk". You may use the default or create another

## 3: Add a .env file to the Project root containing the following two Variables:

REACT_APP_MAPBOX_ACCESS_TOKEN= Your_Access_token_here <br/>
REACT_APP_DB_BASE_URL=https://europe-west1-senf-dev.cloudfunctions.net/api
<br/><br/>
Tip: If you already started the React Server before adding these variables you need to restart the react server afterwards

## 4: Install packages

run `npm install`

## 5: Run project

run `npm start`

## 6: Open it

go to [http://localhost:3000](http://localhost:3000)
