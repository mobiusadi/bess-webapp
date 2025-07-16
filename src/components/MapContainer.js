import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

function ChangeView({ center, zoom }) {
  const map = useMap();
  if (center && typeof center[0] === 'number' && typeof center[1] === 'number') {
    map.flyTo(center, zoom);
  }
  return null;
}

const calculateMarkerRadius = (mw) => {
  if (!mw || typeof mw !== 'number' || mw <= 0) {
    return 6; 
  }
  return 6 + Math.log(mw) * 2;
};

function LeafletMap({ incidents, selectedIncident, onMarkerClick }) {
  const [activeIncident, setActiveIncident] = useState(null);
  const defaultPosition = [30, 0];

  return (
    <MapContainer center={defaultPosition} zoom={2} style={{ height: '100%', width: '100%' }}>
      {/* NEW: Using the CARTO "Positron" light grey tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {selectedIncident && (
        <ChangeView center={[selectedIncident.latitude, selectedIncident.longitude]} zoom={6} />
      )}

      {incidents.map(incident => {
        if (typeof incident.latitude !== 'number' || typeof incident.longitude !== 'number') {
          return null;
        }
        
        const isSelected = selectedIncident?.id === incident.id;
        const scale = calculateMarkerRadius(incident.capacity_mw);

        // NEW: Default marker is now grey, selected is red
        const markerColor = isSelected ? '#dc3545' : '#555555';

        const icon = L.divIcon({
          html: `<svg viewBox="0 0 24 24" width="${scale * 2}" height="${scale * 2}"><circle cx="12" cy="12" r="10" fill="${markerColor}" fill-opacity="0.8" stroke="white" stroke-width="2"/></svg>`,
          className: '',
          iconSize: [scale * 2, scale * 2],
        });

        return (
          <Marker 
            key={incident.id} 
            position={[incident.latitude, incident.longitude]}
            icon={icon}
            eventHandlers={{
              mouseover: () => setActiveIncident(incident),
              mouseout: () => setActiveIncident(null),
              click: () => onMarkerClick(incident),
            }}
          >
            {activeIncident?.id === incident.id && (
              <Popup>
                <b>{incident.location}</b><br />
                {incident.capacity_mw && `${incident.capacity_mw} MW`}
              </Popup>
            )}
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default LeafletMap;