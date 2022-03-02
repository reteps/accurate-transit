import { useState, useRef, useEffect } from 'react'

// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiaWN5cGV0ZSIsImEiOiJjbDA4dGhkaW4wNnVwM2Jtb3lsOXowZnhvIn0.cWT_BqZf2H30UQvBKMHlgA';

export default function Map() {
  const [map, setMap] = useState<mapboxgl.Map>()
  const mapNode = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    console.log('triggered')
    const node = mapNode.current;
    if (node === null) return;

    // if (map !== null) return; // initialize map once
    const mapboxMap = new mapboxgl.Map({
      container: node,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    
    setMap(mapboxMap)
  }, []);

  return (
    <div>
      <div ref={mapNode} style={{ width: "100%", height: "500px" }} className="map-container" />
    </div>
    );
}
