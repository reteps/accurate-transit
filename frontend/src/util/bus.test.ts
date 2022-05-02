import { BusDeparture, BusRoute, BusTrip } from 'types/bus';
import { busDepartureToGeoJson } from './bus';

test('busDepartureToGeoJson returns a valid result', async () => {
  const mock: BusDeparture = {
    stop_id: 'string',
    headsign: 'string', // text displayed on bus (e.g. "5E Green")
    route: {} as unknown as BusRoute,
    trip: {} as unknown as BusTrip,
    vehicle_id: 'string',
    origin: {
      stop_id: 'string',
    },
    destination: {
      stop_id: 'string',
    },
    is_monitored: true, // whether the vehicle is communicating
    is_scheduled: true, // whether this trip was scheduled
    is_istop: true, // if this trip can be boarded without a fare/pass ("istop")
    scheduled: 'string',
    expected: 'string',
    expected_mins: 69,
    location: {
      lat: 0,
      lon: 1,
    },
    predicted_mins: 0,
  };
  const result = await busDepartureToGeoJson(mock);

  expect(result).toEqual(expect.anything());
  expect(result.features[0].geometry.coordinates[0]).toBe(mock.location.lon);
  expect(result.features[0].geometry.coordinates[1]).toBe(mock.location.lat);
});

export {};
