import { useState, useEffect } from 'react';
import { BusRoute, BusStation } from 'types/Bus';
import BusList from 'components/BusList';
import { getStationsNearMe, getBusesNearStation } from 'util/bus';
import BusSelector from './BusSelector';

export default function BusView() {
  const [buses, setBuses] = useState<BusRoute[]>([]);
  const [stations, setStations] = useState<BusStation[]>([]);

  useEffect(() => {
    getStationsNearMe().then(setStations);
  }, [setStations]);

  useEffect(() => {
    if (stations.length > 0) {
      getBusesNearStation(stations[0]).then(setBuses);
    }
  }, [setBuses, stations]);

  return (
    <div className="border-2 border-black">
      <h1>BusView</h1>
      <BusSelector
        stations={stations}
        onSelect={station => getBusesNearStation(station).then(setBuses)}
      />
      <BusList buses={buses} />
    </div>
  );
}
