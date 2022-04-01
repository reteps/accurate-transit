/**
 * Types related to the bus api
 *
 * Overview:
 */

/* Begin old types */

type BusRouteId = string;
type BusStationId = string;

// in UI
export type BusRouteOld = {
  id: BusRouteId;
  name: string; // route name
  color: string;
};

export type BusStationOld = {
  id: BusStationId;
  lat: number;
  long: number;
  name: string;
  buses: BusRouteId[];
};

export type StationStopOld = {
  bus_id: string;
  cumtd_utc: number;
  predicted_utc: number;
};

/* End old types */

/**
 * These types correspond with the CUMTD API types
 * See: https://developer.cumtd.com/documentation/v2.2/definitions/
 */

type Location = {
  lat: number;
  lon: number;
};

/**
 * A bus stop that may contain multiple bus stop points.
 * This is what users consider to be a "bus stop". There may be multiple places
 * where the bus stops at this stop (i.e., on different sides of the street).
 *
 * From the CUMTD API:
 * A stop is a collection of one or more stop points in a logical or geographic
 * grouping
 */
type BusStop = {
  stop_id: string;
  stop_name: string;
  code: string;
  stop_points: BusStopPoint[];
};

/**
 * A place where the bus stops.
 *
 * From the CUMTD API:
 * A stop point is a specific location where our vehicles will board or alight
 * passengers. Results include geographic information.
 */
type BusStopPoint = {
  code: string;
  stop_id: string;
  stop_lat: number;
  stop_long: number;
  stop_name: string;
};

/**
 * A bus route. This does not include the shape, stops, or locations of
 * physical buses.
 *
 * From the CUMTD API:
 * A route is exactly what it sounds like. Keep in mind that some routes maybe
 * split up. (e.g. GREEN, GREENHOPPER, GREEN EVENING, GREEN WEEKEND,
 * GREENHOPPER WEEKEND, etc.)
 */
type BusRoute = {
  route_id: string;
  route_long_name: string;
  route_short_name: string;
  route_color: string;
  route_text_color: string;
};

/**
 * A single path that a bus may take.
 *
 * From the CUMTD API:
 * A trip is an individual run of a route at a specific time. While multiple
 * trips may follow the same stop pattern, a trip is a single instance of that
 * pattern.
 */
type BusTrip = {
  trip_id: string;
  trip_headsign: string;
  route_id: string;
  block_id: string;
  direction: string;
  service_id: string;
  shape_id: string;
};

/**
 * The single location of one particular bus.
 *
 * From the CUMTD API:
 * These are live, vehicle-centric results based on GPS and the latest
 * information in our system. We've tried to pack as much useful data into the
 * results so you can use this in conjunction with the other methods to piece
 * together all the information about a given vehicle in real-time
 */
type BusVehicle = {
  vehicle_id: string;
  trip: BusTrip;
  location: Location;
  previous_stop_id: string;
  next_stop_id: string;
  origin_stop_id: string;
  destination_stop_id: string;
  last_updated: string;
};

/**
 * A bus that departures at a specific time from a stop.
 *
 * From the CUMTD API:
 * A departure represent a bus approaching a given stop. Results include
 * real-time departure time, route information, and vehicle location regarding
 * the bus.
 */
type BusDeparture = {
  stop_id: string;
  headsign: string; // text displayed on bus (e.g. "5E Green")
  route: BusRoute;
  trip: BusTrip;
  vehicle_id: string;
  origin: {
    stop_id: string;
  };
  destination: {
    stop_id: string;
  };
  is_monitored: boolean; // whether the vehicle is communicating
  is_scheduled: boolean; // whether this trip was scheduled
  is_istop: boolean; // if this trip can be boarded without a fare/pass ("istop")
  scheduled: string;
  expected: string;
  expected_mins: number;
  location: Location;
};

export type {
  Location,
  BusStop,
  BusStopPoint,
  BusRoute,
  BusTrip,
  BusVehicle,
  BusDeparture,
};
