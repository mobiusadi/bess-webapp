import React from 'react';
import Globe from 'react-globe.gl';

function GlobeView({ incidents }) {
  const globeData = incidents
    .filter(d => d.latitude && d.longitude)
    .map(d => ({
      lat: d.latitude,
      lng: d.longitude,
      size: d.capacity_mw ? 0.1 + Math.log(d.capacity_mw + 1) / 10 : 0.1,
      color: '#dc3545',
      name: d.location,
    }));

  return (
    // This div gets the 'full-page-view' style which now has the correct height and position
    <div className="full-page-view">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        backgroundColor="rgba(255,255,255,1)"
        pointsData={globeData}
        pointAltitude="size"
        pointColor="color"
        pointLabel="name"
      />
    </div>
  );
}

export default GlobeView;