import { useState, useEffect } from 'react';
import Map from 'components/Map';
import { BusDeparture, BusStop } from 'types/bus';
import { getStopsNearMe, getDeparturesByStop } from 'util/bus';
import BusList from 'components/BusList';
import BusSelector from 'components/BusSelector';

export default function Overview() {
  const [buses, setBuses] = useState<BusDeparture[]>([]);
  const [stops, setStops] = useState<BusStop[]>([]);
  const [stop, setStop] = useState<BusStop | null>(null);

  useEffect(() => {
    getStopsNearMe().then(stops => {
      setStops(stops);
      if (stops.length > 0) {
        setStop(stops[0]);
      }
    });
  }, [setStops]);

  useEffect(() => {
    if (stop) {
      getDeparturesByStop(stop.stop_id).then(setBuses);
    }
  }, [stop]);

  return (
    <div className="">
      <h1 className="my-6 mx-4 text-3xl">Overview</h1>
      {stop && <Map stop={stop} buses={buses} />}
      <BusSelector stops={stops} onSelect={setStop} />
      <BusList buses={buses} />
    </div>
  );
}
