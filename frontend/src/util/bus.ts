import { BusDeparture, BusStop } from 'types/bus';
import { History } from 'types/historical';
import { getCurrentLocation } from 'api/location';
import { _getHistoryDaily } from 'api/historical';
import { getDeparturesByStopCumtd, getStopsByLatLonCumtd } from 'api/cumtd';

async function getStopsNearMe(): Promise<BusStop[]> {
  const location = await getCurrentLocation();
  const stops = await getStopsByLatLonCumtd(location.lat, location.lon);
  // todo: sort by distance up to a threshold
  return stops;
}

function busDepartureToGeoJson(bus: BusDeparture): any {
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

async function getBusInfo(
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

export {
  getStopsNearMe,
  busDepartureToGeoJson,
  getBusInfo,
  getDeparturesByStop,
  getDailyHistory,
};
