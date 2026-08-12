import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { AreaData, GroupData } from '../types';
import { ThemeId } from './Header';

interface MapViewProps {
  areas: AreaData[];
  groups: GroupData[];
  selectedArea: AreaData | null;
  selectedGroup: GroupData | null;
  currentTheme: ThemeId;
  onSelectArea: (area: AreaData | null) => void;
  onSelectGroup: (group: GroupData | null) => void;
  onSelectCityHQ?: (cityName: string, cityGroups: GroupData[]) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  areas,
  groups,
  selectedArea,
  selectedGroup,
  currentTheme,
  onSelectArea,
  onSelectGroup,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  // Determine MapLibre Basemap tiles depending on selected visual theme
  const getBasemapTileUrl = (theme: ThemeId): string => {
    switch (theme) {
      case 'terrain-topo':
      case 'slate-clean':
        return 'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';
      case 'editorial-atlas':
        return 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
      case 'dark-glow':
      case 'speleo-emerald':
      default:
        return 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const tileUrl = getBasemapTileUrl(currentTheme);

    const style: maplibregl.StyleSpecification = {
      version: 8,
      name: 'SSS Speleo Atlas',
      sources: {
        'carto-basemap': {
          type: 'raster',
          tiles: [tileUrl],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap &copy; CARTO'
        }
      },
      layers: [
        {
          id: 'base-layer',
          type: 'raster',
          source: 'carto-basemap',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: style,
      center: [19.6, 48.7], // Slovakia geographical center
      zoom: 7.5,
      pitch: 20,
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');

    map.on('load', () => {
      // 1. Add Karst Organic Polygons Source
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
            type: 'Polygon' as const,
            coordinates: area.polygon!.coordinates
          }
        }));

      map.addSource('sss-areas', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: areaFeatures as any
        }
      });

      // Fill Layer for Organic Karst Polygons
      map.addLayer({
        id: 'areas-fill',
        type: 'fill',
        source: 'sss-areas',
        paint: {
          'fill-color': '#E0912F',
          'fill-opacity': 0.28
        }
      });

      // Line Layer for Organic Karst Polygons
      map.addLayer({
        id: 'areas-outline',
        type: 'line',
        source: 'sss-areas',
        paint: {
          'line-color': '#E0912F',
          'line-width': 2.2,
          'line-opacity': 0.85
        }
      });

      // Area Centroid Labels
      map.addLayer({
        id: 'areas-labels',
        type: 'symbol',
        source: 'sss-areas',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Semibold'],
          'text-size': 12,
          'text-transform': 'uppercase',
          'text-letter-spacing': 0.08
        },
        paint: {
          'text-color': '#F4EFE6',
          'text-halo-color': '#1E2522',
          'text-halo-width': 2
        }
      });

      // 2. Add City HQ POI Markers Source
      const poiFeatures = groups
        .filter((g) => g.hq_coordinates && g.hq_coordinates.length === 2)
        .map((g) => ({
          type: 'Feature' as const,
          properties: {
            id: g.id,
            name: g.name,
            city: g.hq_city || 'Sídlo skupiny'
          },
          geometry: {
            type: 'Point' as const,
            coordinates: [g.hq_coordinates![0], g.hq_coordinates![1]]
          }
        }));

      map.addSource('sss-group-pois', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: poiFeatures as any
        }
      });

      // City HQ Circle POI Layer
      map.addLayer({
        id: 'group-pois-circle',
        type: 'circle',
        source: 'sss-group-pois',
        paint: {
          'circle-radius': 7,
          'circle-color': '#2C5F6F',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#E0912F'
        }
      });

      // City HQ Label Layer
      map.addLayer({
        id: 'group-pois-label',
        type: 'symbol',
        source: 'sss-group-pois',
        layout: {
          'text-field': ['get', 'city'],
          'text-font': ['Open Sans Regular'],
          'text-size': 11,
          'text-offset': [0, 1.3],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#E0912F',
          'text-halo-color': '#1E2522',
          'text-halo-width': 2
        }
      });

      // Cursor & Click Handlers
      map.on('mouseenter', 'areas-fill', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'areas-fill', () => {
        map.getCanvas().style.cursor = '';
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

      map.on('mouseenter', 'group-pois-circle', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'group-pois-circle', () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('click', 'group-pois-circle', (e) => {
        if (e.features && e.features.length > 0) {
          const groupId = e.features[0].properties?.id;
          const clickedGroup = groups.find((g) => g.id === groupId);
          if (clickedGroup) {
            onSelectGroup(clickedGroup);
          }
        }
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [currentTheme]);

  // Fly to selected Area or Group HQ POI
  useEffect(() => {
    if (!mapRef.current) return;

    if (selectedGroup && selectedGroup.hq_coordinates && selectedGroup.hq_coordinates.length === 2) {
      mapRef.current.flyTo({
        center: [selectedGroup.hq_coordinates[0], selectedGroup.hq_coordinates[1]],
        zoom: 11,
        duration: 1200
      });
    } else if (selectedArea && selectedArea.polygon) {
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
          { padding: 120, maxZoom: 11, duration: 1200 }
        );
      }
    }
  }, [selectedArea, selectedGroup]);

  return <div ref={mapContainerRef} className="map-container" />;
};
