/**
 * Generic bus route
 */

// in UI
export type BusRoute = {
  id: string
  name: string // route name
  color: string
};

export type BusStation = {
  id: string
  lat: number
  long: number
  name: string
}

export type StationStop = {
  bus_id: string
  cumtd_utc: number
  predicted_utc: number
}