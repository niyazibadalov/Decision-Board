import DecisionList from './components/DecisionList';
import DecisionDetail from './components/DecisionDetail';
import NewDecisionModal from './components/NewDecisionModal';
import { useDecisions } from './hooks/useDecisions';

function App() {
  const {
    decisions,
    activeDecision,
    activeDecisionId,
    mobileView,
    setMobileView,
    selectDecision,
    isModalOpen,
    setIsModalOpen,
    createDecision,
    deleteDecision,
    addOption,
    selectOption
  } = useDecisions();

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col md:flex-row font-sans antialiased text-slate-800">
      <div className={`w-full md:w-96 ${mobileView === 'detail' ? 'hidden md:block' : 'block'}`}>
        <DecisionList
          decisions={decisions}
          activeId={activeDecisionId}
          onSelect={selectDecision}
          onDelete={deleteDecision}
          onOpenModal={() => setIsModalOpen(true)}
        />
      </div>

      <div className={`flex-1 ${mobileView === 'list' ? 'hidden md:block' : 'block'}`}>
        <DecisionDetail
          decision={activeDecision}
          onSelectOption={selectOption}
          onAddOption={addOption}
          onBackToList={() => setMobileView('list')}
        />
      </div>

      {isModalOpen && (
        <NewDecisionModal
          onClose={() => setIsModalOpen(false)}
          onCreate={createDecision}
        />
      )}
    </div>
  );
}

export default App;