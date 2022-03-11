import { useState, useEffect } from 'react';
import { getBusInfo } from 'util/bus';
import { BusRoute } from 'types/Bus';
import { useParams } from 'react-router-dom';

export default function Bus() {
  const [busInfo, setBusInfo] = useState<BusRoute | null>(null);
  const [isBusNotFound, setIsBusNotFound] = useState(false);
  let { busId } = useParams() as { busId: string };

  useEffect(() => {
    getBusInfo(busId).then(maybeBusInfo => {
      if (maybeBusInfo) {
        setBusInfo(maybeBusInfo);
      } else {
        setIsBusNotFound(true);
      }
    });
  }, []);

  if (isBusNotFound) {
    return (
      <div>
        <h1>Bus not found</h1>
        <p>
          ID: <code>{busId}</code>
        </p>
        <p>
          The bus you are looking for does not exist.
        </p>
      </div>
    );
  }
  if (busInfo === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>
        Bus: {busInfo.id} {busInfo.name}
      </h1>
    </div>
  );
}
