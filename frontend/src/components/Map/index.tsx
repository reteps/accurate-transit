import { useState, useRef, useEffect } from 'react';
import { BusDeparture, BusStop } from 'types/bus';
import { MapEventType } from 'mapbox-gl';
import { busDepartureToGeoJson } from 'util/bus';
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken =
  'pk.eyJ1IjoiaWN5cGV0ZSIsImEiOiJjbDA4dGhkaW4wNnVwM2Jtb3lsOXowZnhvIn0.cWT_BqZf2H30UQvBKMHlgA';

export interface MapProps {
  stop: BusStop;
  buses: BusDeparture[];
}

export default function Map({ stop, buses }: MapProps) {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapNode = useRef<any>(null);
  const [lng, setLng] = useState(-88.2434);
  const [lat, setLat] = useState(40.1164);
  const [zoom, setZoom] = useState(12);
  const stations = buses;

  useEffect(() => {
    const node = mapNode.current;
    if (node === null) return;

    if (map !== undefined) return; // initialize map once
    const mapboxMap = new mapboxgl.Map({
      container: node,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    setMap(mapboxMap);
  }, []);

  const onMapLoad = () => {
    if (map === null || map === undefined || stations === null) return; // wait for map to initialize

    buses.forEach(bus =>
      map.addLayer({
        id: `bus_${bus.trip.trip_id}`,
        type: 'circle',
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: 'geojson',
          data: busDepartureToGeoJson(bus),
        },
        paint: {
          'circle-radius': 6,
          'circle-color': `#${bus.route.route_color}`,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 2,
        },
      })
    );
  };

  useEffect(() => {
    if (map === null || map === undefined) return; // wait for map to initialize
    if (stations === null) return; // wait for data to load

    const node = mapNode.current;
    if (node === null) return;
    map.on('load', onMapLoad);

    return () => {
      map.off('load', onMapLoad);
    };
  }, [map, stations]);

  return (
    <div>
      <div
        ref={mapNode}
        style={{ width: '100%', height: '500px' }}
        className="map-container"
      />
    </div>
  );
}
