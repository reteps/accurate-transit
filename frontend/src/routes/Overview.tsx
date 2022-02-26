import { useState, useEffect } from 'react';
import Map from 'components/Map';
import { BusRoute } from 'types/Bus';
import BusList from 'components/BusList';
import { getBusesNearMe } from 'util/bus';

export default function Overview() {
  const [buses, setBuses] = useState<BusRoute[]>([]);

  useEffect(() => {
    getBusesNearMe().then(setBuses);
  }, [setBuses]);

  return (
    <div>
      <h1>Overview</h1>
      <div>
        <Map />
      </div>
      <h2>Buses near me</h2>
      <BusList buses={buses} />
    </div>
  );
}
