import { useEffect, useMemo } from 'react';
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EVENT_MANAGEMENT_PRESENCE_MARKERS } from '../data/eventManagementMapMarkers';

function InvalidateOnResize() {
  const map = useMap();

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      map.invalidateSize();
    });
    const el = map.getContainer();
    ro.observe(el);
    const t = window.setTimeout(() => map.invalidateSize(), 150);

    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [map]);

  return null;
}

type EventManagementGlobalMapProps = {
  /** Shown on the map region for assistive tech */
  ariaLabel: string;
  /** OSM attribution line (HTML allowed in TileLayer) */
  mapAttribution: string;
};

export default function EventManagementGlobalMap({ ariaLabel, mapAttribution }: EventManagementGlobalMapProps) {
  const markerStyle = {
    color: '#991b1b',
    weight: 2,
    fillColor: '#ef4444',
    fillOpacity: 0.92
  } as const;

  const bounds = useMemo(
    () =>
      L.latLngBounds(
        EVENT_MANAGEMENT_PRESENCE_MARKERS.map((m) => [m.lat, m.lng] as L.LatLngTuple)
      ),
    []
  );

  return (
    <div
      className="relative z-[1] h-[min(36rem,62vh)] w-full min-h-[360px] sm:h-[min(40rem,65vh)] sm:min-h-[400px] lg:h-[min(44rem,72vh)]"
      role="region"
      aria-label={ariaLabel}
    >
      <MapContainer
        className="h-full w-full !bg-slate-900 [&_.leaflet-control-attribution]:max-w-[calc(100%-3rem)] [&_.leaflet-control-attribution]:truncate [&_.leaflet-control-attribution]:text-[10px] [&_.leaflet-control-attribution]:text-slate-600 sm:[&_.leaflet-control-attribution]:text-xs"
        bounds={bounds}
        boundsOptions={{ padding: [40, 40], maxZoom: 3 }}
        minZoom={2}
        maxZoom={12}
        scrollWheelZoom
        worldCopyJump
      >
        <TileLayer attribution={mapAttribution} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <InvalidateOnResize />
        {EVENT_MANAGEMENT_PRESENCE_MARKERS.map((m) => (
          <CircleMarker key={`${m.label}-${m.lat}-${m.lng}`} center={[m.lat, m.lng]} radius={7} pathOptions={markerStyle}>
            <Tooltip direction="top" offset={[0, -4]} opacity={0.95} className="!rounded-md !border !border-slate-600 !bg-slate-900 !px-2 !py-1 !text-xs !text-white">
              {m.label}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
