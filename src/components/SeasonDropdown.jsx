// src/components/SeasonDropdown.jsx
import React from "react";
import "../styles/SeasonDropdown.css";

/**
 * Dropdown component for selecting a season from a list.
 *
 *
 */
export default function SeasonDropdown({
  seasons = [],
  selectedSeasonIndex = 0,
  onChange,
}) {
  function handleChange(e) {
    const index = Number(e.target.value);
    onChange && onChange(index);
  }

  return (
    <div className="season-dropdown">
      <label htmlFor="season-select" className="sr-only">
        Select Season
      </label>
      <select
        id="season-select"
        value={selectedSeasonIndex}
        onChange={handleChange}
      >
        {seasons.map((s, idx) => {
          const title = s.title || `Season ${s.season || idx + 1}`;
          return (
            <option key={s.id || idx} value={idx}>
              {title}
            </option>
          );
        })}
      </select>
    </div>
  );
}
