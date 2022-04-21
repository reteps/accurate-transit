import {
  BusRouteOld,
  BusStationOld,
  StationStopOld,
  BusDeparture,
  BusStop,
} from 'types/bus';
import { History } from 'types/historical';
import { getCurrentLocation } from 'api/location';
import { _getHistoryDaily } from 'api/historical';
import {
  getAllBusRoutes,
  _getAllStations,
  _getNextBusesAtStation,
} from 'api/routes';
import { getDeparturesByStopCumtd, getStopsByLatLonCumtd } from 'api/cumtd';

export async function getStopsNearMe(): Promise<BusStop[]> {
  const location = await getCurrentLocation();
  const stops = await getStopsByLatLonCumtd(location.lat, location.lon);
  // todo: sort by distance up to a threshold
  return stops;
}

export async function getBusesNearMe(): Promise<BusRouteOld[]> {
  const routes = await getAllBusRoutes();
  // todo: filter by distance
  return routes;
}

export async function getBusesNearStation(
  station: BusStationOld
): Promise<BusRouteOld[]> {
  const routes = await getAllBusRoutes();
  // todo: filter near station
  if (Number(station.id) <= 3) {
    // this is just some example code
    return routes.slice(Number(station.id) - 1, Number(station.id));
  }
  return routes.slice(0, 1);
}

export async function getAllStations(): Promise<BusStationOld[]> {
  const stations = await _getAllStations();

  return stations;
}

export async function getNextBusesAtStation(
  stationId: string
): Promise<StationStopOld[]> {
  const stops = await _getNextBusesAtStation(stationId);

  return stops;
}

export function busDepartureToGeoJson(bus: BusDeparture): any {
  const obj = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [bus.location.lon, bus.location.lat],
        },
        properties: {
          name: bus.headsign,
          id: bus.vehicle_id,
        },
      },
    ],
  };
  return obj;
}

export async function getBusInfo(
  vehicleId: string,
  stopId: string
): Promise<BusDeparture | null> {
  const stops = await getDeparturesByStop(stopId);
  const stop = stops.find(stop => stop.vehicle_id === vehicleId) || null;
  return stop;
}

async function getDeparturesByStop(stop_id: string): Promise<BusDeparture[]> {
  const stops = await getDeparturesByStopCumtd(stop_id);
  return stops;
}

async function getDailyHistory(
  vehicleId: string,
  stopId: string,
  startDate: string,
  endDate: string
): Promise<History[]> {
  return await _getHistoryDaily(vehicleId, stopId, startDate, endDate);
}

export { getDeparturesByStop, getDailyHistory };
