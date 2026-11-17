import React, { useState } from 'react';
import { X, PlusCircle, BarChart2 } from 'lucide-react';
import { ChartCard } from '../types';

interface Props {
  isOpen: boolean;
  darkMode: boolean;
  onClose: () => void;
  onAdd: (card: Omit<ChartCard, 'id'>) => void;
}

export const AddCardModal = ({ isOpen, darkMode, onClose, onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Analytics');
  const [type, setType] = useState<'area' | 'bar' | 'line' | 'pie' | 'radar'>('bar');
  const [span2Col, setSpan2Col] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, category, type, span2Col } as any);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`border rounded-2xl w-full max-w-md p-6 shadow-2xl ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <BarChart2 className="text-indigo-500" size={20} />
            Add New Chart Card
          </h3>
          <button onClick={onClose} className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Chart Title / Metric Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Server Response Time"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-500 ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-500 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                }`}
              >
                <option value="Analytics">Analytics</option>
                <option value="Finance">Finance</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Chart Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-500 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                }`}
              >
                <option value="bar">Bar Chart</option>
                <option value="area">Area Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="radar">Radar Chart</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="spanCheck"
              checked={span2Col}
              onChange={(e) => setSpan2Col(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 text-indigo-600"
            />
            <label htmlFor="spanCheck" className={`text-sm font-medium cursor-pointer ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Span 2 Columns (Wide Format)
            </label>
          </div>

          <div className={`flex items-center justify-end gap-3 pt-4 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <PlusCircle size={16} />
              Create Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
