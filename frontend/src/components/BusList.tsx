import { Link } from 'react-router-dom';
import { BusRouteOld } from 'types/bus';

export interface BusListProps {
  buses: BusRouteOld[];
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
  bus: BusRouteOld;
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
