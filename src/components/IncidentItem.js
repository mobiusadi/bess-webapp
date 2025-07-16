import React from 'react';
import ResourceLinkParser from './ResourceLinkParser';

const formatKey = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const getAgeBand = (age) => {
  if (typeof age !== 'number' || isNaN(age)) return null;
  if (age < 1) return '< 1yr';
  if (age < 2) return '1-2yr';
  if (age < 3) return '2-3yr';
  if (age < 4) return '3-4yr';
  if (age < 5) return '4-5yr';
  return '5+ yr';
};

function IncidentItem({ incident, isSelected, onClick }) {
  const year = incident.event_date ? new Date(String(incident.event_date).replace(' ', 'T')).getFullYear() : null;
  const ageBand = getAgeBand(incident.system_age_yr);

  return (
    <div
      className={`incident-item ${isSelected ? 'selected expanded' : ''}`}
      onClick={onClick}
    >
      <div className="incident-content">
        {/* Simplified tag display logic */}
        <div className="incident-tags">
          {incident.country && <span className="tag tag-country">{incident.country}</span>}
          {year && <span className="tag tag-year">{year}</span>}
          {incident.capacity_mw && <span className="tag tag-power">{incident.capacity_mw} MW</span>}
          {ageBand && <span className="tag tag-age">{ageBand}</span>}
        </div>
        
        <h3>{incident.location}</h3>
        
        {/* Expanded view shows the description and other details */}
        {isSelected && (
          <>
            <p className="incident-description">{incident.description}</p>
            {/* You can add back the full details list here if needed */}
          </>
        )}
      </div>
    </div>
  );
}

export default IncidentItem;