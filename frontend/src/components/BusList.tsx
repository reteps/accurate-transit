import { Link } from 'react-router-dom';
import { BusRoute } from 'types/Bus';

export interface BusListProps {
  buses: BusRoute[];
}

export default function BusList({ buses }: BusListProps) {
  return (
    <div>
      {buses.map(bus => (
        <BusListItem key={bus.id} bus={bus} />
      ))}
    </div>
  );
}

interface BusListItemProps {
  bus: BusRoute;
}

function BusListItem({ bus }: BusListItemProps) {
  return (
    <div style={{ backgroundColor: bus.color }}>
      <Link to={`/bus/${bus.id}`}>
        <h2>Bus List Item</h2>
        <p>{bus.id}</p>
        <p>{bus.name}</p>
      </Link>
    </div>
  );
}
