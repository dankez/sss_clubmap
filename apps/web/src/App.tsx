import { useState } from 'react';
import { Header } from './components/Header';
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

  const areas: AreaData[] = sssDataBundle.areas as AreaData[];
  const groups: GroupData[] = sssDataBundle.groups as GroupData[];

  const handleSelectArea = (area: AreaData | null) => {
    setSelectedArea(area);
    if (area) {
      setSelectedGroup(null);
    }
  };

  const handleSelectGroup = (group: GroupData | null) => {
    setSelectedGroup(group);
  };

  const activeTabClass = activeTab === 'groups' ? 'groups-open' : '';

  return (
    <div className={`app-root ${activeTabClass}`}>
      {/* Top Floating Atlas Navigation Header */}
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
      />

      {/* Main Map Canvas */}
      <MapView
        areas={areas}
        groups={groups}
        selectedArea={selectedArea}
        selectedGroup={selectedGroup}
        onSelectArea={handleSelectArea}
        onSelectGroup={handleSelectGroup}
      />

      {/* Area Contextual Floating Card */}
      {selectedArea && (
        <AreaCard
          area={selectedArea}
          groups={groups}
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
