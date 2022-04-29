import { Location } from 'types/bus';

async function getCurrentLocation(): Promise<Location> {
  // Right outside Illini Union. Just for testing
  return {
    lat: 40.1099,
    lon: -88.2273,
  };
}

export { getCurrentLocation };
