import { useState } from 'react';
import { BusStation } from 'types/Bus';

export interface BusSelectorProps {
  stations: BusStation[];
  onSelect: (station: BusStation) => void;
}

export default function BusSelector({ stations, onSelect }: BusSelectorProps) {
  const [selectedStation, setSelectedStation] = useState<BusStation>(
    stations[0]
  );
  return (
    <div>
      <select
        value={selectedStation?.id}
        onChange={e => {
          const station = stations.filter(
            s => s.id === e.currentTarget.value
          )[0];
          setSelectedStation(station);
          onSelect(station);
        }}
      >
        {stations.map(station => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
    </div>
  );
}
