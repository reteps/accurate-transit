import { useState, useRef, useEffect } from 'react'
import { BusStationOld } from 'types/bus';
import { getAllStationsMap } from 'util/bus';
import { MapEventType } from 'mapbox-gl'
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiaWN5cGV0ZSIsImEiOiJjbDA4dGhkaW4wNnVwM2Jtb3lsOXowZnhvIn0.cWT_BqZf2H30UQvBKMHlgA';

export default function Map() {
  const [map, setMap] = useState<mapboxgl.Map>()
  const mapNode = useRef<any>(null);
  const [lng, setLng] = useState(-88.2434);
  const [lat, setLat] = useState(40.1164);
  const [zoom, setZoom] = useState(12);
  const [stations, setStations] = useState<any>(null);

  useEffect(() => {
    getAllStationsMap().then(setStations);
  }, [setStations]);

  useEffect(() => {
    console.log('triggered')
    const node = mapNode.current;
    if (node === null) return;

    console.log(map)
    if (map !== undefined) return; // initialize map once
    const mapboxMap = new mapboxgl.Map({
      container: node,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    
    
    setMap(mapboxMap)
  }, []);

  const onMapLoad = () => {
    if (map === null || map === undefined) return; // wait for map to initialize

    map.addLayer({
      id: 'locations',
      type: 'circle',
      /* Add a GeoJSON source containing place coordinates and information. */
      source: {
        type: 'geojson',
        data: stations
      }
    });
  }
  
  useEffect(() => {

    if (map === null || map === undefined) return; // wait for map to initialize
    if (stations === null) return; // wait for data to load
  
    const node = mapNode.current;
    if (node === null) return;
    map.on('load', onMapLoad)
  }, [map, stations])


  return (
    <div>
      <div ref={mapNode} style={{ width: "100%", height: "500px" }} className="map-container" />
    </div>
    );
}
