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
  console.log(bus);
  return (
    <div
      style={{
        backgroundColor: '#' + bus.route.route_color,
        color: '#' + bus.route.route_text_color,
      }}
    >
      <Link to={`/bus/${bus.route.route_id}`}>
        <h2>Bus List Item</h2>
        <p>{bus.headsign}</p>
      </Link>
    </div>
  );
}
