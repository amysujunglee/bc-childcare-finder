'use client';

import { useState } from 'react';
import { Centre } from '@/lib/mock-data';

interface MapViewProps {
  centres: Centre[];
  selectedCentreId?: string;
  onCentreSelect?: (centreId: string) => void;
}

export default function MapView({ centres, selectedCentreId, onCentreSelect }: MapViewProps) {
  const [hoveredId, setHoveredId] = useState<string>();

  // Calculate bounds
  const lats = centres.map((c) => c.lat);
  const lngs = centres.map((c) => c.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const width = maxLng - minLng || 0.1;
  const height = maxLat - minLat || 0.1;

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-card border border-neutral-border overflow-hidden">
      {/* Map Container */}
      <svg
        viewBox={`${minLng - width * 0.1} ${minLat - height * 0.1} ${width * 1.2} ${height * 1.2}`}
        className="w-full h-full"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="0.01" height="0.01" patternUnits="userSpaceOnUse">
            <path d="M 0.01 0 L 0 0 0 0.01" fill="none" stroke="#E8E4DC" strokeWidth="0.0005" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Centre Pins */}
        {centres.map((centre) => {
          const isSelected = centre.id === selectedCentreId;
          const isHovered = centre.id === hoveredId;
          const isHighlight = isSelected || isHovered;

          return (
            <g key={centre.id}>
              <circle
                cx={centre.lng}
                cy={centre.lat}
                r={isHighlight ? 0.012 : 0.008}
                fill={isHighlight ? '#FF6B6B' : '#4CAF82'}
                opacity={isHighlight ? 1 : 0.7}
                className="cursor-pointer"
                onClick={() => onCentreSelect?.(centre.id)}
                onMouseEnter={() => setHoveredId(centre.id)}
                onMouseLeave={() => setHoveredId(undefined)}
              />
              {isHighlight && (
                <circle
                  cx={centre.lng}
                  cy={centre.lat}
                  r={0.018}
                  fill="none"
                  stroke="#4CAF82"
                  strokeWidth="0.002"
                  opacity="0.3"
                />
              )}
            </g>
          );
        })}
      </svg>

      {hoveredId && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-card p-3 shadow-md border border-neutral-border text-xs">
          {centres.find((c) => c.id === hoveredId)?.name}
        </div>
      )}

      {centres.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <p className="text-neutral-muted text-sm">No centres found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
