import { useState, useEffect } from 'react';
import { BusDeparture, BusStop } from 'types/bus';
import BusList from 'components/BusList';
import { getStopsNearMe, getDeparturesByStop } from 'util/bus';
import BusSelector from './BusSelector';

export default function BusView() {
  const [buses, setBuses] = useState<BusDeparture[]>([]);
  const [stops, setStops] = useState<BusStop[]>([]);

  useEffect(() => {
    getStopsNearMe().then(setStops);
  }, [setStops]);

  useEffect(() => {
    if (stops.length > 0) {
      getDeparturesByStop(stops[0]?.stop_id).then(setBuses);
    }
  }, [setBuses, stops]);

  return (
    <div className="border-2 border-black">
      <h1>BusView</h1>
      <BusSelector
        stops={stops}
        onSelect={station =>
          getDeparturesByStop(station.stop_id).then(setBuses)
        }
      />
      <BusList buses={buses} />
    </div>
  );
}
