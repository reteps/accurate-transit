import Map from 'components/Map';
import BusView from 'components/BusView';

export default function Overview() {
  return (
    <div>
      <h1>Overview</h1>
      <div>
        <Map />
      </div>
      <h2>Buses near me</h2>
      <BusView/>
    </div>
  );
}
