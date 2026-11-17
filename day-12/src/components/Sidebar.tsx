import { LayoutDashboard, BarChart3, Settings, Moon, Sun } from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Sidebar = ({ darkMode, setDarkMode }: SidebarProps) => (
  <aside className={`w-64 border-r p-6 flex flex-col justify-between transition-colors duration-200 ${
    darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
  }`}>
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <LayoutDashboard className="text-indigo-600" /> Dashboard
      </h2>
      <nav className="flex flex-col gap-2">
        <a className="text-indigo-500 font-medium flex items-center gap-2"><BarChart3 size={18}/> Overview</a>
        <a className={`flex items-center gap-2 ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}><Settings size={18}/> Settings</a>
      </nav>
    </div>

    {/* Theme Toggle Button */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
        darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
      }`}
    >
      <span className="flex items-center gap-2">
        {darkMode ? <Moon size={16} className="text-indigo-400" /> : <Sun size={16} className="text-amber-500" />}
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </span>
      <span className={`w-3 h-3 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-amber-500'}`}></span>
    </button>
  </aside>
);
