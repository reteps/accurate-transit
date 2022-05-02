/**
 * This file handles communicating with the CUMTD API directly.
 */

import https from 'https';
import http from 'http';
import querystring from 'querystring';

// CUMTD API URL
const CUMTD_API_URL = 'https://developer.cumtd.com/api/v2.2/json';

const FLASK_API_URL = 'http://10.195.254.165:5001';

// For security reasons, only whitelisted endpoints are allowed.
// This is a map of the allowed endpoint to the list of allowed parameters.
const validEndpoints = {
  getdeparturesbystop: ['stop_id', 'route_id', 'pt', 'count'],
  getstopsbylatlon: ['lat', 'lon', 'count'],
};

async function requestPrediction(departures, source_stop) {
  for (let i = 0; i < departures.length; i++) {
    const departure = departures[i];
    const stop_id = departure.stop_id;
    source_stop = 'PAMD:2';
    const url = `${FLASK_API_URL}/trip/${source_stop}/stop/${stop_id}`;

    try {
      departures[i].predicted_mins = await (new Promise((resolve, reject) => {
        http.get(url, response => {
          // Handle errors.
          if (response.statusCode !== 200) {
            reject('Invalid response from Flask API. ' + response.statusCode);
            return;
          }

          // Read the response.
          let body = '';
          response.on('data', chunk => {
            body += chunk;
          });
          response.on('end', () => {
            resolve(Math.floor(Number(body)/60));
          });
        });
      }));
    } catch (err) {
      departures[i].predicted_mins = -1;
      console.log(err);
    }
  }

  return departures;
}

// Handle a request to the CUMTD API.
function handleCumtd(endpoint, query, res) {
  // Check if the endpoint is valid.
  if (!validEndpoints[endpoint]) {
    res.status(400).send('Invalid endpoint.');
    return;
  }

  // Check that only valid parameters are passed.
  for (const key of Object.keys(query)) {
    if (!validEndpoints[endpoint].includes(key)) {
      res.status(400).send(`Invalid parameter: ${key}`);
      return;
    }
  }

  // Send the request to the CUMTD API.
  const apiKey = process.env.CUMTD_API_KEY;
  const queryString = querystring.stringify(query);
  const url = `${CUMTD_API_URL}/${endpoint}?key=${apiKey}&${queryString}`;
  https.get(url, response => {
    // Handle errors.
    if (response.statusCode !== 200) {
      res
        .status(500)
        .send(`CUMTD API returned status code ${response.statusCode}`);
      return;
    }

    // Read the response.
    let body = '';
    response.on('data', chunk => {
      body += chunk;
    });
    response.on('end', () => {
      // Parse the response.
      try {
        body = JSON.parse(body);
      } catch (err) {
        res.status(500).send('Invalid response from CUMTD API.');
        return;
      }

      if (body.departures) {
        requestPrediction(body.departures, query.stop_id).then(newDepartures => {
          body.departures = newDepartures;
          res.send(body);
        });
      } else {
        // Send the response.
        res.send(body);
      }
    });
  });
}

export { handleCumtd };
