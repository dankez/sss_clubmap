import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { AreaData, GroupData } from '../types';

interface MapViewProps {
  areas: AreaData[];
  groups: GroupData[];
  selectedArea: AreaData | null;
  selectedGroup: GroupData | null;
  onSelectArea: (area: AreaData | null) => void;
  onSelectGroup: (group: GroupData | null) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  areas,
  onSelectArea,
  selectedArea,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Dark Earthy Atlas MapLibre Style
    const style: maplibregl.StyleSpecification = {
      version: 8,
      name: 'SSS Cave Atlas',
      sources: {
        'carto-dark': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }
      },
      layers: [
        {
          id: 'base-carto',
          type: 'raster',
          source: 'carto-dark',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: style,
      center: [19.6, 48.7], // Slovakia geographical center
      zoom: 7.4,
      pitch: 25,
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');

    map.on('load', () => {
      // Build GeoJSON FeatureCollection from areas
      const areaFeatures = areas
        .filter((area) => area.polygon && area.polygon.coordinates)
        .map((area) => ({
          type: 'Feature' as const,
          properties: {
            id: area.id,
            name: area.name,
            cave_count: area.aggregated_cave_count?.value || 0,
            slug: area.slug
          },
          geometry: {
            type: area.polygon!.type as 'Polygon',
            coordinates: area.polygon!.coordinates
          }
        }));

      const geojsonData: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: areaFeatures as any
      };

      map.addSource('sss-areas', {
        type: 'geojson',
        data: geojsonData
      });

      // Fill Layer for Karst Polygons
      map.addLayer({
        id: 'areas-fill',
        type: 'fill',
        source: 'sss-areas',
        paint: {
          'fill-color': '#E0912F', // Lantern Amber
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.45,
            0.22
          ]
        }
      });

      // Line Layer for Karst Polygons
      map.addLayer({
        id: 'areas-outline',
        type: 'line',
        source: 'sss-areas',
        paint: {
          'line-color': '#E0912F',
          'line-width': 2,
          'line-opacity': 0.85
        }
      });

      // Area Centroid Labels Layer
      map.addLayer({
        id: 'areas-labels',
        type: 'symbol',
        source: 'sss-areas',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Semibold'],
          'text-size': 13,
          'text-transform': 'uppercase',
          'text-letter-spacing': 0.1
        },
        paint: {
          'text-color': '#F6F1E7',
          'text-halo-color': '#211E1B',
          'text-halo-width': 2
        }
      });

      let hoveredStateId: string | number | null = null;

      map.on('mousemove', 'areas-fill', (e) => {
        if (e.features && e.features.length > 0) {
          map.getCanvas().style.cursor = 'pointer';
          if (hoveredStateId !== null) {
            map.setFeatureState({ source: 'sss-areas', id: hoveredStateId }, { hover: false });
          }
          hoveredStateId = e.features[0].id || e.features[0].properties?.id;
          if (hoveredStateId !== null) {
            map.setFeatureState({ source: 'sss-areas', id: hoveredStateId }, { hover: true });
          }
        }
      });

      map.on('mouseleave', 'areas-fill', () => {
        map.getCanvas().style.cursor = '';
        if (hoveredStateId !== null) {
          map.setFeatureState({ source: 'sss-areas', id: hoveredStateId }, { hover: false });
        }
        hoveredStateId = null;
      });

      map.on('click', 'areas-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const areaId = e.features[0].properties?.id;
          const clickedArea = areas.find((a) => a.id === areaId);
          if (clickedArea) {
            onSelectArea(clickedArea);
          }
        }
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Fly to area when selected Area changes
  useEffect(() => {
    if (!mapRef.current || !selectedArea || !selectedArea.polygon) return;
    const coords = selectedArea.polygon.coordinates[0];
    if (coords && coords.length > 0) {
      const lngs = coords.map((c) => c[0]);
      const lats = coords.map((c) => c[1]);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);

      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat]
        ],
        { padding: 100, maxZoom: 11, duration: 1200 }
      );
    }
  }, [selectedArea]);

  return <div ref={mapContainerRef} className="map-container" />;
};
