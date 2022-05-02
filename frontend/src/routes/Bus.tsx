import { useState, useEffect } from 'react';
import { getBusInfo, getDailyHistory } from 'util/bus';
import { BusDeparture } from 'types/bus';
import { useParams, Link } from 'react-router-dom';
import { History } from 'types/historical';
export default function Bus() {
  const [busInfo, setBusInfo] = useState<BusDeparture | null>(null);
  const [dailyHistory, setDailyHistory] = useState<History[]>([]);
  const [isBusNotFound, setIsBusNotFound] = useState(false);
  let { vehicleId, stopId } = useParams() as {
    vehicleId: string;
    stopId: string;
  };

  useEffect(() => {
    getBusInfo(vehicleId, stopId).then(maybeBusInfo => {
      if (maybeBusInfo) {
        setBusInfo(maybeBusInfo);
      } else {
        setIsBusNotFound(true);
      }
    });
  }, [vehicleId, stopId]);

  useEffect(() => {
    const endDate = new Date();
    let startDate = new Date();
    // go back 7 days
    startDate.setDate(endDate.getDate() - 7);
    getDailyHistory(
      vehicleId,
      stopId,
      startDate.toString(),
      endDate.toString()
    ).then(setDailyHistory);
  }, [stopId, vehicleId]);

  if (isBusNotFound) {
    return (
      <div>
        <h1>Bus not found</h1>
        <p>
          ID: <code>{vehicleId}</code>
        </p>
        <p>The bus you are looking for does not exist.</p>
      </div>
    );
  }
  if (busInfo === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="flex items-center py-6">
        <Link to="/overview">
          <div className="flex-none p-2 rounded border-2 border-gray hover:bg-black hover:text-white hover:border-transparent transition">
            Back
          </div>
        </Link>
        <h1 className="flex-auto mx-4 text-3xl">{busInfo.headsign}</h1>
      </div>
      <div className="flex items-center">
        <div
          style={{
            backgroundColor: '#' + busInfo.route.route_color,
            color: '#' + busInfo.route.route_text_color,
            width: 50,
            height: 50,
          }}
          className="flex items-center rounded-full"
        >
          <div className="m-auto">
            {busInfo.route.route_short_name + busInfo.trip.direction[0]}
          </div>
        </div>
        <p className="ml-4">
          Scheduled in {busInfo.expected_mins} minutes.
          {busInfo.predicted_mins >= 0 && ` Predicted in ${busInfo.predicted_mins} mins`}
        </p>
      </div>
      <div>
        <h2 className="text-xl m-2">Historical Stops</h2>
        {dailyHistory.map(h => (
          <div key={h.trip.trip_id + h.last_updated}>{h.last_updated}</div>
        ))}
      </div>
    </div>
  );
}
