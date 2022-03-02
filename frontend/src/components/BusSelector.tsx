import { useState } from 'react';
import { BusStation } from 'types/Bus';

export interface BusSelectorProps {
  stations: BusStation[];
}

export default function BusSelector({ stations }: BusSelectorProps) {
  const [selectedStation, setSelectedStation] = useState<BusStation>(stations[0]);
  return (
    <div>
      <select value={selectedStation.id} onChange={e => setSelectedStation(stations.filter(s => s.id === e.target.value)[0])}>
        {stations.map(station => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
    </div>
  );
}