/**
 * CUMTD API
 */

import { CumtdApiResponse } from 'types/cumtd';
import { BusDeparture, BusStop } from 'types/bus';

const _baseUrl = 'https://developer.cumtd.com/api/v2.2/json';

/**
 * Internal function to make CUMTD API calls.
 *
 * The T type param is the type (key and value) of the response.
 */
async function _rawApiCall<T>(
  endpoint: string,
  params: object
): Promise<CumtdApiResponse<T>> {
  const apiKey = process.env.REACT_APP_CUMTD_API_KEY || '';
  const res = await fetch(
    `${_baseUrl}/${endpoint}?key=${apiKey}&${JSON.stringify(params)}`
  );
  const json = await res.json();
  if (json.status.code !== 200) {
    throw new Error(json.status.msg);
  }
  return json as CumtdApiResponse<T>;
}

/**
 * Get real-time departures for a given stop.
 *
 * https://developer.cumtd.com/documentation/v2.2/method/getdeparturesbystop/
 *
 * @param stop_id Stop ID
 * @param route_id List of route IDs to filter by. May be empty.
 * @param pt Preview time in minutes. 0-60. Default 30
 * @param count Number of results to return. Default is returning all
 */
async function getDeparturesByStop(
  stop_id: string,
  route_id: string[] = [],
  pt: number = 30,
  count: number
): Promise<BusDeparture[]> {
  const res = await _rawApiCall<{ departures: BusDeparture[] }>(
    'getdeparturesbystop',
    {
      stop_id,
      route_id,
      pt,
      count,
    }
  );
  return res.departures;
}

/**
 * Get stops nearest a given lat/lon.
 *
 * @param lat Latitude
 * @param lon Longitude
 * @param count Number of results to return. Default is returning all
 */
async function getStopsByLatLon(
  lat: number,
  lon: number,
  count: number
): Promise<BusStop[]> {
  const res = await _rawApiCall<{ stops: BusStop[] }>('getstopsbylatlon', {
    lat,
    lon,
    count,
  });
  return res.stops;
}
