import React, { useState } from 'react';
import { PenTool, Check, Trash2, RotateCcw, Eye, EyeOff, MousePointerClick } from 'lucide-react';
import { GroupData, AreaData } from '../types';

interface PolygonEditorBarProps {
  groups: GroupData[];
  areas: AreaData[];
  selectedGroup: GroupData | null;
  onSelectGroup: (group: GroupData | null) => void;
  isDrawing: boolean;
  onToggleDrawing: () => void;
  drawnPoints: number[][]; // [lng, lat][]
  onUndoPoint: () => void;
  onClearPoints: () => void;
  onSavePolygon: (groupId: string, points: number[][]) => void;
  showPolygons: boolean;
  onToggleShowPolygons: () => void;
}

export const PolygonEditorBar: React.FC<PolygonEditorBarProps> = ({
  groups,
  selectedGroup,
  onSelectGroup,
  isDrawing,
  onToggleDrawing,
  drawnPoints,
  onUndoPoint,
  onClearPoints,
  onSavePolygon,
  showPolygons,
  onToggleShowPolygons,
}) => {
  const [targetGroupId, setTargetGroupId] = useState<string>(selectedGroup?.id || '');

  const handleGroupChange = (id: string) => {
    setTargetGroupId(id);
    const g = groups.find((gr) => gr.id === id) || null;
    onSelectGroup(g);
  };

  const handleSave = () => {
    const activeId = targetGroupId || selectedGroup?.id;
    if (!activeId) {
      alert('Vyberte skupinu, ktorej chcete polygon priradiť!');
      return;
    }
    if (drawnPoints.length < 3) {
      alert('Na vytvorenie polygonu musíte na mape vyklikať aspoň 3 body!');
      return;
    }

    onSavePolygon(activeId, drawnPoints);
  };

  const activeGroup = groups.find((g) => g.id === (targetGroupId || selectedGroup?.id));

  return (
    <div className="polygon-editor-bar glass-panel">
      <div className="bar-header">
        <div className="bar-title font-ui">
          <PenTool className="icon-amber" size={18} />
          <span>Editor polygonov pre skupiny</span>
        </div>

        {/* Global Polygon Visibility Toggle */}
        <button
          className={`btn-toggle-poly ${showPolygons ? 'active' : ''}`}
          onClick={onToggleShowPolygons}
          title={showPolygons ? 'Skryť vyhľadané polygóny na mape' : 'Zobraziť vyklikané polygóny na mape'}
        >
          {showPolygons ? <Eye size={15} /> : <EyeOff size={15} />}
          <span>{showPolygons ? 'Polygóny: Zobrazené' : 'Polygóny: Skryté (Default)'}</span>
        </button>
      </div>

      <div className="bar-body">
        {/* Target Group Selector */}
        <div className="group-picker-box">
          <label htmlFor="group-select">Priradiť skupine:</label>
          <select
            id="group-select"
            className="group-dropdown font-ui"
            value={targetGroupId || selectedGroup?.id || ''}
            onChange={(e) => handleGroupChange(e.target.value)}
          >
            <option value="">-- Vyberte skupinu SSS --</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} {g.hq_city ? `(${g.hq_city})` : ''} {g.polygon ? '✓ (Má polygon)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Drawing Controls */}
        <div className="drawing-actions">
          <button
            className={`btn-draw ${isDrawing ? 'is-active' : ''}`}
            onClick={onToggleDrawing}
          >
            <MousePointerClick size={16} />
            <span>{isDrawing ? 'Kreslenie AKTÍVNE (Klikajte na mapu)' : 'Vyklikať nový polygon'}</span>
          </button>

          {isDrawing && (
            <div className="points-counter">
              <span>Body: <strong>{drawnPoints.length}</strong></span>
            </div>
          )}

          {drawnPoints.length > 0 && (
            <>
              <button className="btn-tool" onClick={onUndoPoint} title="Zmazať posledný bod">
                <RotateCcw size={15} /> Späť
              </button>
              <button className="btn-tool danger" onClick={onClearPoints} title="Vymazať všetky body">
                <Trash2 size={15} /> Vyčistiť
              </button>
              <button className="btn-save-poly" onClick={handleSave}>
                <Check size={16} /> Uložiť skupine {activeGroup ? `"${activeGroup.name.slice(0, 18)}..."` : ''}
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .polygon-editor-bar {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 980px;
          padding: 0.9rem 1.25rem;
          z-index: 12;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-shadow: var(--shadow-floating);
          border: 1px solid rgba(224, 145, 47, 0.3);
        }

        .bar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(213, 206, 194, 0.12);
          padding-bottom: 0.5rem;
        }

        .bar-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--color-limestone);
        }

        .btn-toggle-poly {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(213, 206, 194, 0.2);
          color: var(--color-fog);
          border-radius: var(--radius-sm);
          padding: 0.35rem 0.65rem;
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-toggle-poly.active {
          background: rgba(224, 145, 47, 0.2);
          border-color: var(--color-lantern-amber);
          color: var(--color-lantern-amber);
        }

        .bar-body {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .group-picker-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          min-width: 280px;
        }

        .group-picker-box label {
          font-size: 0.8rem;
          color: var(--color-fog);
          white-space: nowrap;
        }

        .group-dropdown {
          flex: 1;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(213, 206, 194, 0.2);
          border-radius: var(--radius-md);
          padding: 0.45rem 0.75rem;
          color: var(--color-limestone);
          font-size: 0.85rem;
          outline: none;
        }

        .group-dropdown option {
          background: #1E2522;
          color: #F4EFE6;
        }

        .drawing-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-draw {
          background: var(--color-lantern-amber);
          color: #1A140E;
          border: none;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-draw.is-active {
          background: #E53935;
          color: #FFF;
          animation: pulse-drawing 1.5s infinite;
        }

        @keyframes pulse-drawing {
          0% { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.6); }
          70% { box-shadow: 0 0 0 10px rgba(229, 57, 53, 0); }
          100% { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0); }
        }

        .points-counter {
          font-size: 0.82rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.4rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .btn-tool {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(213, 206, 194, 0.2);
          color: var(--color-limestone);
          padding: 0.45rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-tool.danger:hover {
          background: rgba(229, 57, 53, 0.2);
          border-color: #E53935;
          color: #FF8A80;
        }

        .btn-save-poly {
          background: var(--color-moss-green);
          color: #FFF;
          border: none;
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .btn-save-poly:hover {
          background: #4B6940;
        }
      `}</style>
    </div>
  );
};
