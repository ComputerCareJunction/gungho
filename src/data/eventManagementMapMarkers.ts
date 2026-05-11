/**
 * Approximate real-world coordinates matching the stylised global presence map:
 * US (coast + interior + south), Mexico, Brazil, Western/Central Europe, India,
 * East Asia, Southeast Asia, Philippines, Australia.
 */
export type PresenceMarker = { lat: number; lng: number; label: string };

export const EVENT_MANAGEMENT_PRESENCE_MARKERS: readonly PresenceMarker[] = [
  // North America
  { lat: 40.7128, lng: -74.006, label: 'New York' },
  { lat: 38.9072, lng: -77.0369, label: 'Washington DC' },
  { lat: 41.8781, lng: -87.6298, label: 'Chicago' },
  { lat: 34.0522, lng: -118.2437, label: 'Los Angeles' },
  { lat: 29.7604, lng: -95.3698, label: 'Houston' },
  { lat: 47.6062, lng: -122.3321, label: 'Seattle' },
  { lat: 19.4326, lng: -99.1332, label: 'Mexico City' },
  // South America
  { lat: -22.9068, lng: -43.1729, label: 'Rio de Janeiro' },
  // Europe
  { lat: 51.5074, lng: -0.1278, label: 'London' },
  { lat: 48.8566, lng: 2.3522, label: 'Paris' },
  { lat: 52.52, lng: 13.405, label: 'Berlin' },
  { lat: 41.9028, lng: 12.4964, label: 'Rome' },
  // Asia (India hubs per site copy + regional programme markers)
  { lat: 28.6139, lng: 77.209, label: 'Delhi' },
  { lat: 12.9716, lng: 77.5946, label: 'Bangalore' },
  { lat: 19.076, lng: 72.8777, label: 'Mumbai' },
  { lat: 31.2304, lng: 121.4737, label: 'Shanghai' },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
  { lat: 13.7563, lng: 100.5018, label: 'Bangkok' },
  { lat: 14.5995, lng: 120.9842, label: 'Manila' },
  // Australia
  { lat: -33.8688, lng: 151.2093, label: 'Sydney' }
] as const;
