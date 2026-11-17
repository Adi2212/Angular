import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChartCardComponent } from './components/ChartCard';
import { AddCardTile } from './components/AddCardTile';
import { AddCardModal } from './components/AddCardModal';
import { ChartRenderer } from './components/ChartRenderer';
import { ExtendedChartCard } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [cards, setCards] = useState<ExtendedChartCard[]>([
    { id: '1', title: 'Monthly Revenue', category: 'Finance', span2Col: true, type: 'area' },
    { id: '2', title: 'Traffic Sources', category: 'Analytics', span2Col: false, type: 'bar' },
    { id: '3', title: 'CPU Usage', category: 'Infrastructure', span2Col: false, type: 'line' },
    { id: '4', title: 'Regional Share', category: 'Sales', span2Col: false, type: 'pie' },
    { id: '5', title: 'Conversion Funnel', category: 'Growth', span2Col: false, type: 'radar' },
  ]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragOver = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    const newCards = [...cards];
    const fromIdx = newCards.findIndex(c => c.id === draggedId);
    const toIdx = newCards.findIndex(c => c.id === targetId);
    const [card] = newCards.splice(fromIdx, 1);
    newCards.splice(toIdx, 0, card);
    setCards(newCards);
  };

  const handleToggleSpan = (id: string) => {
    setCards(cards.map(c => c.id === id ? { ...c, span2Col: !c.span2Col } : c));
  };

  const handleAddCard = (newCardData: Omit<ExtendedChartCard, 'id'>) => {
    const newCard: ExtendedChartCard = {
      id: Date.now().toString(),
      ...newCardData,
    };
    setCards([...cards, newCard]);
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Interactive Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 grid-flow-dense auto-rows-max">
          {cards.map(card => (
            <ChartCardComponent
              key={card.id}
              card={card}
              darkMode={darkMode}
              onDragStart={setDraggedId}
              onDragOver={handleDragOver}
              onToggle={handleToggleSpan}
            >
              <ChartRenderer type={card.type} darkMode={darkMode} />
            </ChartCardComponent>
          ))}

          {/* The last card is the Add New Card tile */}
          <AddCardTile darkMode={darkMode} onAdd={() => setIsModalOpen(true)} />
        </div>
      </main>

      <AddCardModal
        isOpen={isModalOpen}
        darkMode={darkMode}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCard}
      />
    </div>
  );
}
