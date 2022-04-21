#!/usr/bin/env bash

# Called by the github action to build and run the frontend and backend for the
# cypress test

# Requires CUMTD_API_KEY to be set in the environment

# Should be run in this (frontend) directory

set -ex

npm i -g yarn

# build the backend
cd ../backend
yarn install

# start the backend
yarn start &

# build the frontend
cd ../frontend
yarn install
yarn build

# start the frontend
yarn start
