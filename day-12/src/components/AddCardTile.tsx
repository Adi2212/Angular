import { Plus } from 'lucide-react';

interface Props {
  darkMode: boolean;
  onAdd: () => void;
}

export const AddCardTile = ({ darkMode, onAdd }: Props) => (
  <div
    onClick={onAdd}
    className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer min-h-[180px] group transition-all ${
      darkMode
        ? 'bg-slate-900/40 border-slate-800 hover:border-indigo-500 text-slate-300'
        : 'bg-slate-50 border-slate-300 hover:border-indigo-600 text-slate-700'
    }`}
  >
    <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-2">
      <Plus size={20} />
    </div>
    <span className="text-sm font-semibold group-hover:text-indigo-500">Add New Chart Card</span>
  </div>
);
