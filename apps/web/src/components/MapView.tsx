import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { AreaData, GroupData } from '../types';
import { ThemeId } from './Header';
import { MapLayerId, MAP_LAYERS } from './LayerControlWidget';

const POLYGON_PALETTE = [
  '#0D9488', // Teal
  '#D97706', // Amber
  '#2563EB', // Royal Blue
  '#059669', // Emerald
  '#7C3AED', // Violet
  '#E11D48', // Rose
  '#0284C7', // Cyan
  '#B45309', // Bronze
  '#4F46E5', // Indigo
  '#65A30D'  // Lime
];

interface MapViewProps {
  areas: AreaData[];
  groups: GroupData[];
  selectedArea: AreaData | null;
  selectedGroup: GroupData | null;
  currentTheme: ThemeId;
  showPolygons: boolean;
  showPois: boolean;
  activeLayerId: MapLayerId;
  is3D: boolean;
  isDrawing?: boolean;
  drawnPoints?: number[][];
  onAddDrawnPoint?: (point: [number, number]) => void;
  onSelectArea: (area: AreaData | null) => void;
  onSelectGroup: (group: GroupData | null) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  groups,
  selectedArea,
  selectedGroup,
  showPolygons,
  showPois,
  activeLayerId,
  is3D,
  isDrawing = false,
  drawnPoints = [],
  onAddDrawnPoint,
  onSelectGroup,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const htmlMarkersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const layerObj = MAP_LAYERS.find((l) => l.id === activeLayerId) || MAP_LAYERS[0];

    const style: maplibregl.StyleSpecification = {
      version: 8,
      name: 'SSS Speleo Atlas',
      sources: {
        'carto-basemap': {
          type: 'raster',
          tiles: [layerObj.tileUrl],
          tileSize: 256,
          maxzoom: layerObj.maxZoom,
          attribution: '&copy; OpenStreetMap &copy; OpenTopoMap'
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
      pitch: is3D ? 65 : 0,
      bearing: is3D ? -25 : 0,
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');

    // Enable Right-Click Drag Mouse Panning & Prevent Default Context Menu
    const container = mapContainerRef.current;
    let isRightMouseDown = false;
    let lastMousePos = { x: 0, y: 0 };

    const preventContextMenu = (e: MouseEvent) => e.preventDefault();

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 2) { // Right mouse button
        isRightMouseDown = true;
        lastMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isRightMouseDown && mapRef.current) {
        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;
        mapRef.current.panBy([-dx, -dy], { animate: false });
        lastMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 2) {
        isRightMouseDown = false;
      }
    };

    container.addEventListener('contextmenu', preventContextMenu);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    map.on('load', () => {
      const initialVisibility = showPolygons ? 'visible' : 'none';

      // Safely add DEM elevation source
      try {
        if (!map.getSource('terrarium-dem')) {
          map.addSource('terrarium-dem', {
            type: 'raster-dem',
            tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
            tileSize: 256,
            encoding: 'terrarium',
            maxzoom: 15
          });
        }
        if (is3D) {
          map.setTerrain({ source: 'terrarium-dem', exaggeration: 2.2 });
        }
      } catch (e) {
        console.warn('DEM Terrain error fallback:', e);
      }

      // 1. Manually Added Group Polygons Source (With DISTINCT palette colors per group)
      const groupPolygonFeatures = groups
        .filter((g) => g.polygon && g.polygon.coordinates && g.polygon.coordinates.length > 0)
        .map((g, idx) => {
          const color = POLYGON_PALETTE[idx % POLYGON_PALETTE.length];
          return {
            type: 'Feature' as const,
            properties: {
              id: g.id,
              name: g.name,
              city: g.hq_city || '',
              fillColor: color,
              strokeColor: color
            },
            geometry: {
              type: 'Polygon' as const,
              coordinates: g.polygon!.coordinates
            }
          };
        });

      map.addSource('sss-group-polygons', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: groupPolygonFeatures as any
        }
      });

      map.addLayer({
        id: 'group-polygons-fill',
        type: 'fill',
        source: 'sss-group-polygons',
        layout: {
          visibility: initialVisibility
        },
        paint: {
          'fill-color': ['get', 'fillColor'],
          'fill-opacity': 0.45
        }
      });

      map.addLayer({
        id: 'group-polygons-outline',
        type: 'line',
        source: 'sss-group-polygons',
        layout: {
          visibility: initialVisibility
        },
        paint: {
          'line-color': ['get', 'strokeColor'],
          'line-width': 3.0,
          'line-opacity': 0.95
        }
      });

      // 3D Extrusion Layer for group polygons (Rises 500m up from mountain terrain)
      try {
        map.addLayer({
          id: 'group-polygons-3d-extrusion',
          type: 'fill-extrusion',
          source: 'sss-group-polygons',
          layout: {
            visibility: is3D && showPolygons ? 'visible' : 'none'
          },
          paint: {
            'fill-extrusion-color': ['get', 'fillColor'],
            'fill-extrusion-height': 500,
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.72
          }
        });
      } catch (e) {
        console.warn('3D Extrusion layer fallback:', e);
      }

      // Club Name Watermark Label Layer inside Polygon Area
      try {
        map.addLayer({
          id: 'group-polygons-watermark',
          type: 'symbol',
          source: 'sss-group-polygons',
          layout: {
            visibility: initialVisibility,
            'text-field': ['get', 'name'],
            'text-size': 13,
            'text-transform': 'uppercase',
            'text-letter-spacing': 0.08,
            'symbol-placement': 'point',
            'text-allow-overlap': true
          },
          paint: {
            'text-color': ['get', 'strokeColor'],
            'text-opacity': 0.7,
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 1.8
          }
        });
      } catch (e) {
        console.warn('Watermark layer fallback:', e);
      }

      // 2. Admin Drawing Live Feedback Layer
      map.addSource('admin-drawing', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      map.addLayer({
        id: 'admin-drawing-fill',
        type: 'fill',
        source: 'admin-drawing',
        paint: {
          'fill-color': '#E53935',
          'fill-opacity': 0.35
        }
      });

      map.addLayer({
        id: 'admin-drawing-line',
        type: 'line',
        source: 'admin-drawing',
        paint: {
          'line-color': '#E53935',
          'line-width': 3,
          'line-dasharray': [2, 2]
        }
      });

      map.addLayer({
        id: 'admin-drawing-points',
        type: 'circle',
        source: 'admin-drawing',
        filter: ['==', '$type', 'Point'],
        paint: {
          'circle-radius': 6,
          'circle-color': '#E53935',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#FFFFFF'
        }
      });

      // Interactive Map Click Handler for Drawing
      map.on('click', (e) => {
        if (isDrawingRef.current) {
          const lngLat: [number, number] = [e.lngLat.lng, e.lngLat.lat];
          if (onAddDrawnPointRef.current) {
            onAddDrawnPointRef.current(lngLat);
          }
        }
      });

      // Cursor & Click Handlers for Custom Group Polygons
      map.on('mouseenter', 'group-polygons-fill', () => {
        if (!isDrawingRef.current) map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'group-polygons-fill', () => {
        if (!isDrawingRef.current) map.getCanvas().style.cursor = '';
      });

      map.on('click', 'group-polygons-fill', (e) => {
        if (!isDrawingRef.current && e.features && e.features.length > 0) {
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
      container.removeEventListener('contextmenu', preventContextMenu);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      map.remove();
    };
  }, []);

  // True 3D DEM Terrain Elevation & 3D Extrusion Toggle Effect
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    try {
      if (is3D) {
        if (map.getSource('terrarium-dem')) {
          map.setTerrain({ source: 'terrarium-dem', exaggeration: 2.2 });
        }
        if (map.getLayer('group-polygons-3d-extrusion')) {
          map.setLayoutProperty('group-polygons-3d-extrusion', 'visibility', showPolygons ? 'visible' : 'none');
        }
        map.easeTo({
          pitch: 65,
          bearing: -25,
          duration: 1500,
          easing: (t) => t * (2 - t)
        });
      } else {
        map.setTerrain(null);
        if (map.getLayer('group-polygons-3d-extrusion')) {
          map.setLayoutProperty('group-polygons-3d-extrusion', 'visibility', 'none');
        }
        map.easeTo({
          pitch: 0,
          bearing: 0,
          duration: 1200,
          easing: (t) => t * (2 - t)
        });
      }
    } catch (e) {
      console.warn('3D Terrain toggle fallback:', e);
    }
  }, [is3D, showPolygons]);

  // Update Basemap Tiles when activeLayerId changes
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const layerObj = MAP_LAYERS.find((l) => l.id === activeLayerId) || MAP_LAYERS[0];
    const source = map.getSource('carto-basemap') as any;

    if (source && typeof source.setTiles === 'function') {
      source.setTiles([layerObj.tileUrl]);
    } else if (map.getLayer('base-layer')) {
      try {
        map.removeLayer('base-layer');
        if (map.getSource('carto-basemap')) map.removeSource('carto-basemap');
        map.addSource('carto-basemap', {
          type: 'raster',
          tiles: [layerObj.tileUrl],
          tileSize: 256,
          maxzoom: layerObj.maxZoom
        });
        map.addLayer(
          {
            id: 'base-layer',
            type: 'raster',
            source: 'carto-basemap',
            minzoom: 0,
            maxzoom: 19
          },
          map.getStyle().layers[0]?.id
        );
      } catch (e) {
        console.error('Error updating tile layer', e);
      }
    }
  }, [activeLayerId]);

  // Keep refs in sync for event listeners
  const isDrawingRef = useRef(isDrawing);
  const onAddDrawnPointRef = useRef(onAddDrawnPoint);

  useEffect(() => {
    isDrawingRef.current = isDrawing;
    onAddDrawnPointRef.current = onAddDrawnPoint;

    if (mapRef.current) {
      mapRef.current.getCanvas().style.cursor = isDrawing ? 'crosshair' : '';
    }
  }, [isDrawing, onAddDrawnPoint]);

  // Render & Update Prominent HTML Logo POI Markers (Controlled by showPois toggle)
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Remove old HTML markers
    htmlMarkersRef.current.forEach((m) => m.remove());
    htmlMarkersRef.current = [];

    // Track occupied positions to offset overlapping HQ markers
    const placedPositions: Array<{ lng: number; lat: number; count: number }> = [];

    // Strict Grid / Side-by-side & Top-bottom Offsets for colliding markers (42px step)
    const gridOffsets: Array<[number, number]> = [
      [0, 0],
      [42, 0],    // 1: Right
      [-42, 0],   // 2: Left
      [0, -42],   // 3: Top
      [0, 42],    // 4: Bottom
      [42, -42],  // 5: Top-Right
      [-42, 42],  // 6: Bottom-Left
      [-42, -42], // 7: Top-Left
      [42, 42],   // 8: Bottom-Right
      [84, 0],    // 9: Far Right
      [-84, 0],   // 10: Far Left
      [0, -84],   // 11: Far Top
      [0, 84]     // 12: Far Bottom
    ];

    groups.forEach((group) => {
      if (group.hq_coordinates && group.hq_coordinates.length === 2) {
        const lng = group.hq_coordinates[0];
        const lat = group.hq_coordinates[1];

        // Check if another marker exists nearby (< 0.06 deg threshold)
        const match = placedPositions.find(
          (p) => Math.abs(p.lng - lng) < 0.06 && Math.abs(p.lat - lat) < 0.06
        );

        let offsetX = 0;
        let offsetY = 0;

        if (match) {
          match.count += 1;
          const idx = Math.min(match.count, gridOffsets.length - 1);
          offsetX = gridOffsets[idx][0];
          offsetY = gridOffsets[idx][1];
        } else {
          placedPositions.push({ lng, lat, count: 0 });
        }

        const el = document.createElement('div');
        el.className = 'custom-poi-marker-badge';
        if (!showPois) el.style.display = 'none';

        const logoHtml = group.logo_url
          ? `<img src="${group.logo_url}" alt="${group.name}" class="poi-marker-logo" />`
          : `<span class="poi-marker-initials">${group.name.substring(0, 2).toUpperCase()}</span>`;

        el.innerHTML = `
          <div class="poi-badge-inner">
            ${logoHtml}
          </div>
          <div class="poi-badge-label">${group.name}</div>
        `;

        el.addEventListener('mouseenter', () => {
          el.style.zIndex = '99999';
        });
        el.addEventListener('mouseleave', () => {
          el.style.zIndex = '5';
        });

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!isDrawingRef.current) {
            onSelectGroup(group);
          }
        });

        const marker = new maplibregl.Marker({ element: el, offset: [offsetX, offsetY] })
          .setLngLat([lng, lat])
          .addTo(map);

        htmlMarkersRef.current.push(marker);
      }
    });
  }, [groups, showPois]);

  // Dynamically update sss-group-polygons source with palette colors whenever groups change
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const source = map.getSource('sss-group-polygons') as maplibregl.GeoJSONSource;
    if (!source) return;

    const groupPolygonFeatures = groups
      .filter((g) => g.polygon && g.polygon.coordinates && g.polygon.coordinates.length > 0)
      .map((g, idx) => {
        const color = POLYGON_PALETTE[idx % POLYGON_PALETTE.length];
        return {
          type: 'Feature' as const,
          geometry: g.polygon!,
          properties: {
            id: g.id,
            name: g.name,
            fillColor: color.fill,
            strokeColor: color.stroke
          }
        };
      });

    source.setData({
      type: 'FeatureCollection',
      features: groupPolygonFeatures
    });
  }, [groups]);

  // Update Polygon Visibility when showPolygons changes
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const visibility = showPolygons ? 'visible' : 'none';

    ['group-polygons-fill', 'group-polygons-outline', 'group-polygons-watermark'].forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', visibility);
      }
    });

    if (map.getLayer('group-polygons-3d-extrusion')) {
      map.setLayoutProperty('group-polygons-3d-extrusion', 'visibility', is3D && showPolygons ? 'visible' : 'none');
    }
  }, [showPolygons, is3D]);

  // Sync 3D Extrusion visibility with is3D prop & camera pitch
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    if (map.getLayer('group-polygons-3d-extrusion')) {
      map.setLayoutProperty(
        'group-polygons-3d-extrusion',
        'visibility',
        is3D && showPolygons ? 'visible' : 'none'
      );
    }
  }, [is3D, showPolygons]);

  // Update Admin Drawing Overlay features
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const source = map.getSource('admin-drawing') as maplibregl.GeoJSONSource;

    if (!source) return;

    if (!drawnPoints || drawnPoints.length === 0) {
      source.setData({ type: 'FeatureCollection', features: [] });
      return;
    }

    const features: any[] = [];

    // Individual Point Vertices
    drawnPoints.forEach((pt, index) => {
      features.push({
        type: 'Feature',
        properties: { pointIndex: index + 1 },
        geometry: { type: 'Point', coordinates: pt }
      });
    });

    // Connecting Line string
    if (drawnPoints.length >= 2) {
      features.push({
        type: 'Feature',
        properties: {},
        geometry: { type: 'LineString', coordinates: drawnPoints }
      });
    }

    // Polygon Fill Preview if 3+ points
    if (drawnPoints.length >= 3) {
      const closedCoords = [...drawnPoints, drawnPoints[0]];
      features.push({
        type: 'Feature',
        properties: {},
        geometry: { type: 'Polygon', coordinates: [closedCoords] }
      });
    }

    source.setData({
      type: 'FeatureCollection',
      features: features
    });
  }, [drawnPoints]);

  // Decoupled Flying: Only fly to HQ coordinates if NOT drawing mode!
  useEffect(() => {
    if (!mapRef.current) return;
    if (isDrawing) return; // DO NOT auto-fly or auto-center when admin is drawing polygon!

    if (selectedGroup && selectedGroup.hq_coordinates && selectedGroup.hq_coordinates.length === 2) {
      mapRef.current.flyTo({
        center: [selectedGroup.hq_coordinates[0], selectedGroup.hq_coordinates[1]],
        zoom: 12.5,
        pitch: is3D ? 55 : 0,
        bearing: is3D ? 15 : 0,
        duration: 1600
      });
      return;
    }

    if (selectedArea) {
      const groupIds = selectedArea.group_relationships.map((rel) => rel.group_id);
      const areaGroups = groups.filter((g) => groupIds.includes(g.id));
      const validCoords = areaGroups
        .map((g) => g.hq_coordinates)
        .filter((coords): coords is [number, number] => !!coords && coords.length === 2);

      if (validCoords.length > 0) {
        let minLng = validCoords[0][0];
        let maxLng = validCoords[0][0];
        let minLat = validCoords[0][1];
        let maxLat = validCoords[0][1];

        validCoords.forEach(([lng, lat]) => {
          if (lng < minLng) minLng = lng;
          if (lng > maxLng) maxLng = lng;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        });

        mapRef.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat]
          ],
          { padding: 120, maxZoom: 11, duration: 1200 }
        );
      }
    }
  }, [selectedArea, selectedGroup, isDrawing]);

  return (
    <div ref={mapContainerRef} className="map-container">
      <style>{`
        .custom-poi-marker-badge {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.2s;
        }

        .custom-poi-marker-badge:hover {
          z-index: 99999 !important;
        }

        .poi-badge-inner {
          width: 35px;
          height: 35px;
          border-radius: 8px;
          background: #FFFFFF;
          border: 1.5px solid #0D9488;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .custom-poi-marker-badge:hover .poi-badge-inner {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          border-color: #E0912F;
          transform: translateY(-4px) scale(1.15);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7), 0 0 0 4px rgba(224, 145, 47, 0.55);
        }

        .poi-marker-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 5px;
        }

        .poi-marker-initials {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.88rem;
          color: #0F172A;
        }

        .poi-badge-label {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-4px);
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
          background: rgba(20, 25, 23, 0.94);
          color: #F8FAFC;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 99px;
          margin-top: 5px;
          white-space: nowrap;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(224, 145, 47, 0.5);
          backdrop-filter: blur(8px);
          pointer-events: none;
        }

        .custom-poi-marker-badge:hover .poi-badge-label {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};
