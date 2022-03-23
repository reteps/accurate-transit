/**
 * Generic bus route
 */

type BusRouteId = string;
type BusStationId = string;

// in UI
export type BusRoute = {
  id: BusRouteId;
  name: string; // route name
  color: string;
};

export type BusStation = {
  id: BusStationId;
  lat: number,
  long: number,
  name: string
  buses: BusRouteId[];
}