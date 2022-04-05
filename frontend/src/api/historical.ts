import { History } from 'types/historical'
import { BusDeparture } from 'types/bus';
import { getBusInfo } from 'util/bus';


function fakeHistoryDaily(sample: BusDeparture, numResults: number): History[] {
  // add += random minutes to centerTime, set this as last_updated field
  return [...(Array(numResults).keys() as unknown as number[])].map(i => {
    const randomMins = Math.floor(Math.random() * 10) - 5;

    const offset = randomMins * 60 * 1000;
    const dayOffset = i*24*60*60*1000;
    const tweakedTime = new Date((new Date(sample.scheduled)).getTime() + (offset - dayOffset));
    console.log(tweakedTime)

    return {
      vehicle_id: sample.vehicle_id,
      trip: sample.trip,
      location: sample.location,
      last_updated: tweakedTime.toString(),
    }
  });
}

async function _getHistoryDaily(
  vehicleId: string,
  stopId: string,
  startDate: string,
  endDate: string
): Promise<History[]> {
  const info = await getBusInfo(vehicleId, stopId);
  if (info !== null) {
    return fakeHistoryDaily(info, 10);
  }
  return [];
}

export { _getHistoryDaily };