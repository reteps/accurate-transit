# tiny timely transit
> "bus algo go brrr" - Unknown, 2021

Tiny Timely Transit (TTT) is a transit web app targetting the Champaign-Urbana Mass Transit District (CUMTD), although its core tenets could be easily modified to work for any other mass transit system.

TTT's predictions are based on a machine learning model that looks at recent trips along the same bus route, and makes predictions based on environmental conditions and historical data. Its strong recency bias ensures that factors like weather, closures, etc. Are accounted for without being dependent on external data sources for this information.

## Application Structure

This repository contains all of the code required to build and run an instance of TTT. The only external dependency is an API key for the CUMTD API, which can be acquired [here](https://developer.cumtd.com/).

### `./scrape`

The scrape directory contains a basic scraper script that ingests data from the CUMTD API and logs it to disk. This was mostly used for our data discovery phase, and is not necessary to run the app.

### `./frontend`

The frontend directory contains the source code for TTT's webapp. It is built using ReactJS with TypeScript and Tailwind for styling. Dependency management is handled through Yarn. The frontend app also has end-to-end testing implemented in Cypress.

#### Running Instructions
The frontend app can be run with `yarn start`, and its test suite can be run with `yarn run cypress open`.

### `./backend`

The backend directory contains the source code for a lightweight ExpressJS gateway that collates and serves data from the CUMTD API and our own analytics to the frontend app.

It requires that the CUMTD API key is stored in an environment variable named `CUMTD_API_KEY`.  

It can then be run with `yarn start`.

### `./analytics`

The analytics directory contains our exploratory data analysis and code for our prediction model. It also provides a lightweight server that is ingested by [`./backend`]

