import { BusRoute } from 'types/Bus';

// todo: use actual api endpoint
const ENDPOINT = '#';

export async function getAllBusRoutes(): Promise<BusRoute[]> {
  // how it would look once we have an api endpoint
  /*
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
  */
  return [
    {
      id: '1',
      name: 'Yellow',
      color: '#ff0',
    },
    {
      id: '22',
      name: 'Illini',
      color: '#5420b5',
    },
    {
      id: '13',
      name: 'Silver',
      color: '#c0c0c0',
    },
  ];
}
