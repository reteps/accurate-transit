#!/usr/bin/env bash

# Called by the github action to build and run the frontend and backend for the
# cypress test

# Requires CUMTD_API_KEY to be set in the environment

set -ex

npm i -g yarn

# build the frontend
cd frontend
yarn install
yarn build

# build the backend
cd ../backend
yarn install

# start the backend
yarn start &
# start the frontend
cd ../frontend
yarn start
