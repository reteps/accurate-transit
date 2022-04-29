/**
 * This file handles communicating with the CUMTD API directly.
 */

import https from 'https';
import querystring from 'querystring';

// CUMTD API URL
const CUMTD_API_URL = 'https://developer.cumtd.com/api/v2.2/json';

// For security reasons, only whitelisted endpoints are allowed.
// This is a map of the allowed endpoint to the list of allowed parameters.
const validEndpoints = {
  getdeparturesbystop: ['stop_id', 'route_id', 'pt', 'count'],
  getstopsbylatlon: ['lat', 'lon', 'count'],
};

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

      // Send the response.
      res.send(body);
    });
  });
}

export { handleCumtd };
