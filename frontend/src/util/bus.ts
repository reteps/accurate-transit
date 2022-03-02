import { BusRoute, BusStation } from 'types/Bus';
import { getAllBusRoutes, _getAllStations } from 'api/routes';

export async function getBusesNearMe(): Promise<BusRoute[]> {
  const routes = await getAllBusRoutes();
  // todo: filter by distance
  return routes;
}

export async function getAllStations(): Promise<BusStation[]> {
  const stations = await _getAllStations();

  return stations
}