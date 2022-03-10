import { BusRoute, BusStation } from 'types/Bus';
import { getAllBusRoutes, _getAllStations } from 'api/routes';

export async function getStationsNearMe(): Promise<BusStation[]> {
  const stations = await _getAllStations();
  // todo: sort by distance up to a threshold
  return stations;
}

export async function getBusesNearMe(): Promise<BusRoute[]> {
  const routes = await getAllBusRoutes();
  // todo: filter by distance
  return routes;
}

export async function getBusesNearStation(station: BusStation): Promise<BusRoute[]> {
  const routes = await getAllBusRoutes();
  // todo: filter near station
  if (Number(station.id) <= 3) {
    // this is just some example code
    return routes.slice(Number(station.id) - 1, Number(station.id));
  }
  return routes.slice(0, 1);
}

export async function getAllStations(): Promise<BusStation[]> {
  const stations = await _getAllStations();

  return stations
}

export async function getBusInfo(id: string): Promise<BusRoute | undefined> {
  const routes = await getAllBusRoutes();
  const route = routes.find(r => r.id === id);
  return route;
}
