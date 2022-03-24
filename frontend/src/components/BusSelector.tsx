import { useState } from 'react';
import { BusStationOld } from 'types/bus';

export interface BusSelectorProps {
  stations: BusStationOld[];
  onSelect: (station: BusStationOld) => void;
}

export default function BusSelector({ stations, onSelect }: BusSelectorProps) {
  const [selectedStation, setSelectedStation] = useState<BusStationOld>(
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
