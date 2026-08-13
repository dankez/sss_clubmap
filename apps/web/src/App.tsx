import { useState, useEffect } from 'react';
import { Header, ThemeId } from './components/Header';
import { MapView } from './components/MapView';
import { AreaCard } from './components/AreaCard';
import { GroupCard } from './components/GroupCard';
import { SearchModal } from './components/SearchModal';
import { GroupsListModal } from './components/GroupsListModal';
import { AboutModal } from './components/AboutModal';
import { AdminModal } from './components/AdminModal';
import { PolygonEditorBar } from './components/PolygonEditorBar';
import { GroupContactModal } from './components/GroupContactModal';
import { AdminGroupEditModal } from './components/AdminGroupEditModal';
import { WordPressShortcodeModal } from './components/WordPressShortcodeModal';
import { MapLayerId } from './components/LayerControlWidget';
import sssDataBundle from './data/sss-data.json';
import { AreaData, GroupData, AdminCredentials } from './types';

const INITIAL_ADMIN_CREDS: AdminCredentials = {
  username: 'dankez',
  email: 'michal.danko@gmail.com',
  passwordRaw: 'blesk11*'
};

export function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'areas' | 'groups' | 'about'>('map');
  const [selectedArea, setSelectedArea] = useState<AreaData | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWpModalOpen, setIsWpModalOpen] = useState(false);

  // Modals for Privacy Contact Form & Admin Group Editing
  const [contactGroupData, setContactGroupData] = useState<GroupData | null>(null);
  const [adminEditingGroup, setAdminEditingGroup] = useState<GroupData | null>(null);

  // 1. Default Visual Theme: Slate Clean Light
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('slate-clean');

  // 2. Default Map Layer: OpenTopoMap (Terén, vrstevnice, vrcholy)
  const [currentMapLayer, setCurrentMapLayer] = useState<MapLayerId>('opentopomap');

  // 3. True 3D DEM Terrain Mode Toggle
  const [is3D, setIs3D] = useState<boolean>(false);

  // 4. Polygons Display Toggle (ON by default)
  const [showPolygons, setShowPolygons] = useState<boolean>(true);

  // 5. POI Logos Display Toggle (ON by default)
  const [showPois, setShowPois] = useState<boolean>(true);

  // Check URL Embed Query Parameters for WordPress / iFrame integration
  const [isEmbedMode, setIsEmbedMode] = useState<boolean>(false);

  // 6. Admin Authentication State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminCreds, setAdminCreds] = useState<AdminCredentials>(() => {
    const saved = localStorage.getItem('sss_admin_creds');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ADMIN_CREDS;
      }
    }
    return INITIAL_ADMIN_CREDS;
  });

  // 7. Custom Assigned Polygons State (Persisted in localStorage)
  const [customGroupPolygons, setCustomGroupPolygons] = useState<Record<string, number[][][]>>(() => {
    const saved = localStorage.getItem('sss_custom_polygons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  // 8. Custom Group Edits State (Fields & Logos uploaded by Admin, Persisted in localStorage)
  const [customGroupEdits, setCustomGroupEdits] = useState<Record<string, Partial<GroupData>>>(() => {
    const saved = localStorage.getItem('sss_custom_group_edits');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  // 9. Interactive Polygon Drawing State
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<number[][]>([]);

  // Base Data Bundle
  const areas = (sssDataBundle.areas as unknown) as AreaData[];
  const rawGroups = (sssDataBundle.groups as unknown) as GroupData[];

  // Merge base groups with admin edits AND custom assigned polygons
  const groups: GroupData[] = rawGroups.map((g) => {
    let merged = { ...g };

    // Apply Admin Field Edits (Logo, Name, HQ City, Email, Website, Description)
    if (customGroupEdits[g.id]) {
      merged = {
        ...merged,
        ...customGroupEdits[g.id]
      };
    }

    // Apply Custom Manually Drawn Polygon
    if (customGroupPolygons[g.id]) {
      merged.polygon = {
        type: 'Polygon',
        coordinates: customGroupPolygons[g.id]
      };
    }

    return merged;
  });

  // Parse URL parameters for WordPress shortcodes / iFrame embeds on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('embed') === 'true') {
      setIsEmbedMode(true);
    }

    const groupParam = params.get('group');
    if (groupParam) {
      const foundGroup = groups.find((g) => g.id === groupParam);
      if (foundGroup) setSelectedGroup(foundGroup);
    }

    const areaParam = params.get('area');
    if (areaParam) {
      const foundArea = areas.find((a) => a.id === areaParam);
      if (foundArea) setSelectedArea(foundArea);
    }

    const layerParam = params.get('layer');
    if (layerParam) setCurrentMapLayer(layerParam as MapLayerId);

    const themeParam = params.get('theme');
    if (themeParam) setCurrentTheme(themeParam as ThemeId);

    const polyParam = params.get('polygons');
    if (polyParam === 'false') setShowPolygons(false);

    const poisParam = params.get('pois');
    if (poisParam === 'false') setShowPois(false);

    const is3dParam = params.get('is3d');
    if (is3dParam === 'true') setIs3D(true);
  }, []);

  // Keep selectedGroup in sync if edits happen
  const activeSelectedGroup = selectedGroup
    ? groups.find((g) => g.id === selectedGroup.id) || selectedGroup
    : null;

  // Update body theme class whenever theme changes
  useEffect(() => {
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  // Persist admin creds
  useEffect(() => {
    localStorage.setItem('sss_admin_creds', JSON.stringify(adminCreds));
  }, [adminCreds]);

  // Persist custom polygons
  useEffect(() => {
    localStorage.setItem('sss_custom_polygons', JSON.stringify(customGroupPolygons));
  }, [customGroupPolygons]);

  // Persist custom group edits
  useEffect(() => {
    localStorage.setItem('sss_custom_group_edits', JSON.stringify(customGroupEdits));
  }, [customGroupEdits]);

  // Admin Handlers
  const handleAdminLogin = (user: string, pass: string): boolean => {
    const isUserMatch = user.toLowerCase() === adminCreds.username.toLowerCase() || user.toLowerCase() === adminCreds.email.toLowerCase();
    const isPassMatch = pass === (adminCreds.passwordRaw || 'admin');

    if (isUserMatch && isPassMatch) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    setIsDrawing(false);
    setDrawnPoints([]);
  };

  const handleChangePassword = (newPass: string) => {
    setAdminCreds((prev) => ({
      ...prev,
      passwordRaw: newPass
    }));
  };

  const handleResetPasswordRequest = (email: string, newPass: string): boolean => {
    if (email.toLowerCase() === adminCreds.email.toLowerCase()) {
      setAdminCreds((prev) => ({
        ...prev,
        passwordRaw: newPass
      }));
      return true;
    }
    return false;
  };

  // Group Editing Handler (Admin - including file upload logos)
  const handleSaveGroupEdit = (updatedGroup: GroupData) => {
    setCustomGroupEdits((prev) => ({
      ...prev,
      [updatedGroup.id]: {
        name: updatedGroup.name,
        hq_city: updatedGroup.hq_city,
        website: updatedGroup.website,
        short_description: updatedGroup.short_description,
        logo_url: updatedGroup.logo_url,
        public_contact: updatedGroup.public_contact
      }
    }));

    if (selectedGroup && selectedGroup.id === updatedGroup.id) {
      setSelectedGroup(updatedGroup);
    }

    alert(`Údaje a logo skupiny "${updatedGroup.name}" boli úspešne uplatnené a uložené!`);
  };

  // Polygon Drawing Handlers
  const handleAddDrawnPoint = (point: [number, number]) => {
    setDrawnPoints((prev) => [...prev, point]);
  };

  const handleUndoDrawnPoint = () => {
    setDrawnPoints((prev) => prev.slice(0, -1));
  };

  const handleClearDrawnPoints = () => {
    setDrawnPoints([]);
  };

  const handleSavePolygon = (groupId: string, points: number[][]) => {
    if (points.length < 3) return;

    // Ensure polygon loop is closed
    const closed = [...points, points[0]];
    const newCoords = [closed];

    setCustomGroupPolygons((prev) => ({
      ...prev,
      [groupId]: newCoords
    }));

    setIsDrawing(false);
    setDrawnPoints([]);
    setShowPolygons(true); // Ensure polygon visibility is active

    const targetGroup = groups.find((g) => g.id === groupId);
    alert(`Polygón bol úspešne priradený skupine "${targetGroup?.name || groupId}"!`);
  };

  const handleSelectArea = (area: AreaData | null) => {
    setSelectedArea(area);
    if (area) {
      setSelectedGroup(null);
    }
  };

  const handleSelectGroup = (group: GroupData | null) => {
    setSelectedGroup(group);
    if (group && group.area_relationships && group.area_relationships.length > 0) {
      const linkedAreaId = group.area_relationships[0].area_id;
      const foundArea = areas.find((a) => a.id === linkedAreaId);
      if (foundArea) {
        setSelectedArea(foundArea);
      }
    }
  };

  // Filter ONLY groups active in selected area
  const activeAreaGroups = selectedArea
    ? groups.filter((g) =>
        g.area_relationships?.some((rel) => rel.area_id === selectedArea.id) ||
        (selectedArea.id && g.id && selectedArea.id.includes(g.id))
      )
    : [];

  return (
    <div className={`app-root ${isEmbedMode ? 'is-embed-mode' : ''}`}>
      {/* Top Floating Navigation Header (Hidden if embed mode) */}
      {!isEmbedMode && (
        <Header
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'map') {
              setSelectedArea(null);
              setSelectedGroup(null);
            }
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          groupsCount={groups.length}
          areasCount={areas.length}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          currentMapLayer={currentMapLayer}
          onLayerChange={setCurrentMapLayer}
          is3D={is3D}
          onToggle3D={() => setIs3D(!is3D)}
          showPolygons={showPolygons}
          onTogglePolygons={() => setShowPolygons(!showPolygons)}
          showPois={showPois}
          onTogglePois={() => setShowPois(!showPois)}
          onOpenWpModal={() => setIsWpModalOpen(true)}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
          isLoggedIn={isLoggedIn}
          adminEmail={adminCreds.email}
        />
      )}

      {/* Main Map Canvas */}
      <MapView
        areas={areas}
        groups={groups}
        selectedArea={selectedArea}
        selectedGroup={activeSelectedGroup}
        currentTheme={currentTheme}
        showPolygons={showPolygons}
        showPois={showPois}
        activeLayerId={currentMapLayer}
        is3D={is3D}
        isDrawing={isDrawing}
        drawnPoints={drawnPoints}
        onAddDrawnPoint={handleAddDrawnPoint}
        onSelectArea={handleSelectArea}
        onSelectGroup={handleSelectGroup}
      />

      {/* Admin Interactive Polygon Drawing Control Panel */}
      {isLoggedIn && !isEmbedMode && (
        <PolygonEditorBar
          groups={groups}
          areas={areas}
          selectedGroup={activeSelectedGroup}
          onSelectGroup={handleSelectGroup}
          isDrawing={isDrawing}
          onToggleDrawing={() => setIsDrawing(!isDrawing)}
          drawnPoints={drawnPoints}
          onUndoPoint={handleUndoDrawnPoint}
          onClearPoints={handleClearDrawnPoints}
          onSavePolygon={handleSavePolygon}
          showPolygons={showPolygons}
          onToggleShowPolygons={() => setShowPolygons(!showPolygons)}
        />
      )}

      {/* Area Contextual Floating Card */}
      {selectedArea && (
        <AreaCard
          area={selectedArea}
          groups={activeAreaGroups}
          onClose={() => setSelectedArea(null)}
          onSelectGroup={handleSelectGroup}
        />
      )}

      {/* Group Contextual Presentation Card */}
      {activeSelectedGroup && (
        <GroupCard
          group={activeSelectedGroup}
          onClose={() => setSelectedGroup(null)}
          onOpenContactForm={(g) => setContactGroupData(g)}
          isLoggedIn={isLoggedIn}
          onOpenAdminEdit={(g) => setAdminEditingGroup(g)}
        />
      )}

      {/* Privacy Group Contact Form Modal */}
      {contactGroupData && (
        <GroupContactModal
          isOpen={!!contactGroupData}
          onClose={() => setContactGroupData(null)}
          group={contactGroupData}
        />
      )}

      {/* Admin Group Editor Modal (Supports File Upload Logos) */}
      {adminEditingGroup && (
        <AdminGroupEditModal
          isOpen={!!adminEditingGroup}
          onClose={() => setAdminEditingGroup(null)}
          group={adminEditingGroup}
          onSaveGroup={handleSaveGroupEdit}
        />
      )}

      {/* WordPress Shortcode Generator & WebSupport Plugin Modal */}
      <WordPressShortcodeModal
        isOpen={isWpModalOpen}
        onClose={() => setIsWpModalOpen(false)}
        groups={groups}
        areas={areas}
        currentMapLayer={currentMapLayer}
        currentTheme={currentTheme}
        showPolygons={showPolygons}
        showPois={showPois}
        is3D={is3D}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        areas={areas}
        groups={groups}
        onSelectArea={handleSelectArea}
        onSelectGroup={handleSelectGroup}
      />

      {/* Full Groups Directory Modal */}
      <GroupsListModal
        isOpen={activeTab === 'groups' || activeTab === 'areas'}
        onClose={() => setActiveTab('map')}
        groups={groups}
        onSelectGroup={handleSelectGroup}
      />

      {/* Educational About Modal */}
      <AboutModal
        isOpen={activeTab === 'about'}
        onClose={() => setActiveTab('map')}
      />

      {/* Admin Authentication & Password Reset Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isLoggedIn={isLoggedIn}
        adminCreds={adminCreds}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        onChangePassword={handleChangePassword}
        onResetPasswordRequest={handleResetPasswordRequest}
      />
    </div>
  );
}

export default App;
