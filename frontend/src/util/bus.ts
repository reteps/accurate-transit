import { BusRoute, BusStation, StationStop } from 'types/Bus';
import { getAllBusRoutes, _getAllStations,_getNextBusesAtStation } from 'api/routes';

import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
// todo fix map types

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

export async function getNextBusesAtStation(stationId: string): Promise<StationStop[]> {
  const stops = await _getNextBusesAtStation(stationId);

  return stops
}

export async function getAllStationsMap(): Promise<any> {
  const stations = await _getAllStations();
  const obj = {
    "type": "FeatureCollection",
    "features": stations.map(station => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            station.long,
            station.lat
          ]
        },
        properties: {
          name: station.name,
          id: station.id
        }
      }
    })
  }
  return obj
}


export async function getBusInfo(id: string): Promise<BusRoute | undefined> {
  const routes = await getAllBusRoutes();
  const route = routes.find(r => r.id === id);
  return route;
}
