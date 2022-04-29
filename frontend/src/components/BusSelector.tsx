import { useState } from 'react';
import { BusStop } from 'types/bus';

export interface BusSelectorProps {
  stops: BusStop[];
  onSelect: (stop: BusStop) => void;
}

export default function BusSelector({ stops, onSelect }: BusSelectorProps) {
  const [selectedStop, setSelectedStop] = useState<BusStop>(stops[0]);
  return (
    <div>
      <select
        value={selectedStop?.stop_id}
        onChange={e => {
          const stop = stops.filter(
            s => s.stop_id === e.currentTarget.value
          )[0];
          setSelectedStop(stop);
          onSelect(stop);
        }}
      >
        {stops.map(stop => (
          <option key={stop.stop_id} value={stop.stop_id}>
            {stop.stop_name}
          </option>
        ))}
      </select>
    </div>
  );
}
