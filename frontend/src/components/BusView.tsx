import BusList from 'components/BusList';
import { useState, useEffect } from 'react';
import { BusRoute, BusStation } from 'types/Bus';
import { getBusesNearMe } from 'util/bus';
import BusSelector from './BusSelector';

export default function BusView() {
  const [buses, setBuses] = useState<BusRoute[]>([]);
  const [stations, setStations] = useState<BusStation[]>([
    {
      id: '1',
      name: '서울역',
      lat: 37.56667,
      long: 126.97806

    }
  ]);

  useEffect(() => {
    getBusesNearMe().then(setBuses);
  }, [setBuses]);

  useEffect(() => {
    //
  }, [setStations]);

  return (
    <div className="border-2 border-black">
      <h1>BusView</h1>
      <BusSelector stations={stations} />
      <BusList buses={buses} />
    </div>
  );
}