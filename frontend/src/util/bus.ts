import { BusRoute } from 'types/Bus';
import { getAllBusRoutes } from 'api/routes';

export async function getBusesNearMe(): Promise<BusRoute[]> {
  const routes = await getAllBusRoutes();
  // todo: filter by distance
  return routes;
}
