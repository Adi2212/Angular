import { GripVertical, Maximize2 } from 'lucide-react';
import { ExtendedChartCard } from '../types';

interface Props {
  card: ExtendedChartCard;
  darkMode: boolean;
  onDragStart: (id: string) => void;
  onDragOver: (id: string) => void;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

export const ChartCardComponent = ({ card, darkMode, onDragStart, onDragOver, onToggle, children }: Props) => (
  <div
    draggable
    onDragStart={() => onDragStart(card.id)}
    onDragOver={(e) => { e.preventDefault(); onDragOver(card.id); }}
    className={`border rounded-lg p-3 cursor-grab transition-colors duration-200 ${
      darkMode
        ? 'bg-slate-900 border-slate-800 text-slate-100'
        : 'bg-white border-slate-200 text-slate-800 shadow-sm'
    } ${card.span2Col ? 'lg:col-span-2' : ''}`}
  >
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <GripVertical className={darkMode ? 'text-slate-600' : 'text-slate-400'} size={16} />
        <div>
          {card.category && (
            <span className="text-[10px] uppercase font-semibold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded mr-2">
              {card.category}
            </span>
          )}
          <h3 className={`text-sm font-bold inline ${darkMode ? 'text-white' : 'text-slate-800'}`}>{card.title}</h3>
        </div>
      </div>
      <button onClick={() => onToggle(card.id)} className={`p-1 rounded ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
        <Maximize2 size={14} className={darkMode ? 'text-slate-400' : 'text-slate-500'}/>
      </button>
    </div>
    {children}
  </div>
);
