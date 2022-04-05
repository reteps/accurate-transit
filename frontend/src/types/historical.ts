import { BusTrip, Location } from "./bus";

type History = {
  vehicle_id: string;
  trip: BusTrip;
  location: Location;
  last_updated: string;
};

export type { History };