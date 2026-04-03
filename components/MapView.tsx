'use client';

import { useEffect, useRef } from 'react';
import { Centre } from '@/lib/mock-data';
import { slugify } from '@/lib/utils';

interface MapViewProps {
  centres: Centre[];
  selectedCentreId?: string;
  onCentreSelect?: (centreId: string) => void;
  searchQuery?: string;
}

const BC_POSTAL_CODE = /^[vV]\d[a-zA-Z]\s?\d[a-zA-Z]\d$/;

async function geocode(query: string): Promise<[number, number] | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', BC, Canada')}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch {}
  return null;
}

export default function MapView({ centres, selectedCentreId, onCentreSelect, searchQuery }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);
  const markersRef = useRef<import('leaflet').Marker[]>([]);
  const isInitializingRef = useRef(false);
  const isDestroyedRef = useRef(false);

  // Initialise map once
  useEffect(() => {
    isDestroyedRef.current = false;
    if (!mapRef.current || mapInstanceRef.current || isInitializingRef.current) return;
    isInitializingRef.current = true;

    import('leaflet').then((L) => {
      if (!mapRef.current || mapInstanceRef.current) {
        isInitializingRef.current = false;
        return;
      }
      // @ts-expect-error - _getIconUrl is not in types
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: [49.22, -122.98],
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
      isInitializingRef.current = false;
    });

    return () => {
      isDestroyedRef.current = true;
      isInitializingRef.current = false;
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      markersRef.current = [];
    };
  }, []);

  // Re-render markers whenever centres change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) {
      // Map not ready yet — retry shortly
      const t = setTimeout(() => {
        const m = mapInstanceRef.current;
        if (m) updateMarkers(m);
      }, 300);
      return () => clearTimeout(t);
    }
    updateMarkers(map);
    return undefined;
  }, [centres, selectedCentreId]);

  function updateMarkers(map: import('leaflet').Map) {
    import('leaflet').then((L) => {
      if (isDestroyedRef.current) return;
      // Clear existing markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const greenIcon = L.divIcon({
        className: '',
        html: `<div style="width:32px;height:32px;background:#4CAF82;border:2.5px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -34],
      });

      const selectedIcon = L.divIcon({
        className: '',
        html: `<div style="width:36px;height:36px;background:#1A1A2E;border:2.5px solid #4CAF82;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -38],
      });

      centres.forEach((centre) => {
        const isSelected = centre.id === selectedCentreId;
        const marker = L.marker([centre.lat, centre.lng], {
          icon: isSelected ? selectedIcon : greenIcon,
          title: centre.name,
        });

        marker.bindPopup(`
          <div style="font-family:sans-serif;min-width:180px;">
            <p style="font-weight:700;font-size:14px;margin:0 0 2px;color:#1A1A2E;">${centre.name}</p>
            <p style="color:#666;font-size:12px;margin:0 0 8px;">${centre.city}</p>
            <div style="display:flex;gap:6px;align-items:center;margin-bottom:8px;">
              ${centre.tenDollarDay ? '<span style="background:#4CAF82;color:#fff;padding:2px 8px;border-radius:999px;font-size:11px;">$10/Day</span>' : ''}
              <span style="font-size:12px;color:${centre.spotsAvailable > 0 ? '#4CAF82' : '#ef4444'};font-weight:600;">
                ${centre.spotsAvailable > 0 ? `${centre.spotsAvailable} spots open` : 'Full'}
              </span>
            </div>
            <a href="/centre/${slugify(centre.name)}" style="color:#4CAF82;font-size:12px;font-weight:600;text-decoration:none;">
              View profile →
            </a>
          </div>
        `);

        marker.on('click', () => onCentreSelect?.(centre.id));
        marker.addTo(map);
        markersRef.current.push(marker);
      });

      // Fit map to show all filtered centres
      if (centres.length > 0) {
        const bounds = L.latLngBounds(centres.map((c) => [c.lat, c.lng]));
        map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13, animate: true });
      }
    });
  }

  // Pan to selected centre when card is clicked
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedCentreId) return;
    const centre = centres.find((c) => c.id === selectedCentreId);
    if (centre) {
      map.setView([centre.lat, centre.lng], 14, { animate: true });
    }
  }, [selectedCentreId]);

  // Geocode search query (postal code or city not in our data)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !searchQuery) return;

    const isPostalCode = BC_POSTAL_CODE.test(searchQuery.trim());
    if (isPostalCode) {
      geocode(searchQuery).then((coords) => {
        if (coords) map.setView(coords, 13, { animate: true });
      });
    }
  }, [searchQuery]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div
        ref={mapRef}
        className="w-full rounded-card border border-neutral-border shadow-soft overflow-hidden"
        style={{ height: '420px' }}
      />
    </>
  );
}
