import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useIpInfo } from "../hooks/userIpInfo";

const markerIcon = L.icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

type MoveProps = {
  lat: number;
  lng: number;
};

// the map does not move by itself when the position changes,
// so this small component tells it to move
function MoveMap({ lat, lng }: MoveProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [map, lat, lng]);

  return null;
}

function MapView() {
  const { data } = useIpInfo();

  return (
    <MapContainer center={[20, 0]} zoom={2} className="absolute inset-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data && (
        <>
          <Marker position={[data.location.lat, data.location.lng]} icon={markerIcon} />
          <MoveMap lat={data.location.lat} lng={data.location.lng} />
        </>
      )}
    </MapContainer>
  );
}

export default MapView;