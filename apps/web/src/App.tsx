import { useState, useEffect } from 'react';
import { Header, ThemeId } from './components/Header';
import { MapView } from './components/MapView';
import { AreaCard } from './components/AreaCard';
import { GroupCard } from './components/GroupCard';
import { SearchModal } from './components/SearchModal';
import { GroupsListModal } from './components/GroupsListModal';
import { AboutModal } from './components/AboutModal';
import sssDataBundle from './data/sss-data.json';
import { AreaData, GroupData } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'areas' | 'groups' | 'about'>('map');
  const [selectedArea, setSelectedArea] = useState<AreaData | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('speleo-emerald');

  const areas = (sssDataBundle.areas as unknown) as AreaData[];
  const groups = (sssDataBundle.groups as unknown) as GroupData[];

  // Update body theme class whenever theme changes
  useEffect(() => {
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme]);

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
    <div className="app-root">
      {/* Top Floating Atlas Navigation Header with 5 Themes */}
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
      />

      {/* Main Map Canvas with POIs & Organic Polygons */}
      <MapView
        areas={areas}
        groups={groups}
        selectedArea={selectedArea}
        selectedGroup={selectedGroup}
        currentTheme={currentTheme}
        onSelectArea={handleSelectArea}
        onSelectGroup={handleSelectGroup}
      />

      {/* Area Contextual Floating Card with EXACT filtered groups */}
      {selectedArea && (
        <AreaCard
          area={selectedArea}
          groups={activeAreaGroups}
          onClose={() => setSelectedArea(null)}
          onSelectGroup={handleSelectGroup}
        />
      )}

      {/* Group Contextual Presentation Card */}
      {selectedGroup && (
        <GroupCard
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
        />
      )}

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
    </div>
  );
}

export default App;
