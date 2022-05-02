import { Link } from 'react-router-dom';
import { BusDeparture } from 'types/bus';

export interface BusListProps {
  buses: BusDeparture[];
}

export default function BusList({ buses }: BusListProps) {
  return (
    <div>
      {buses.map(bus => (
        <BusListItem key={bus.trip.trip_id} bus={bus} />
      ))}
    </div>
  );
}

interface BusListItemProps {
  bus: BusDeparture;
}

function BusListItem({ bus }: BusListItemProps) {
  return (
    <div
      style={{
        backgroundColor: '#' + bus.route.route_color,
        color: '#' + bus.route.route_text_color,
      }}
      className="mx-1 my-1 px-2 py-1 border-4 border-transparent rounded hover:border-black"
    >
      <Link to={`/bus/${bus.stop_id}/${bus.vehicle_id}`} className="bus-link">
        <h2>{bus.headsign}</h2>
        <p>Scheduled: {bus.expected_mins} mins</p>
        {bus.predicted_mins >= 0 && <p>Predicted: {bus.predicted_mins} mins</p>}
      </Link>
    </div>
  );
}
